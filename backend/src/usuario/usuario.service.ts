import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UserRole } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verifica se email já está cadastrado
    const existingUser = await this.usuarioRepository.findOne({ 
      where: { email: createUsuarioDto.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      tipoConta: createUsuarioDto.tipoConta || UserRole.COMUM
    });

    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    
    if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
      const existingUser = await this.findByEmail(updateUsuarioDto.email);
      if (existingUser) {
        throw new ConflictException('Email já está em uso por outro usuário');
      }
    }

    await this.usuarioRepository.update(id, updateUsuarioDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }
}