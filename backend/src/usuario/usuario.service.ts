import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verifica se email já existe (usando findOneBy)
    const existingUser = await this.usuarioRepository.findOneBy({ 
      email: createUsuarioDto.email 
    });
    
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);

    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: hashedPassword,
    });

    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: id });
    
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ email });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    
    // Verifica se está tentando atualizar o email
    if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
      const emailExists = await this.usuarioRepository.findOneBy({ 
        email: updateUsuarioDto.email 
      });
      if (emailExists) {
        throw new ConflictException('Email já está em uso por outro usuário');
      }
    }

    // Atualiza a senha apenas se for fornecida
    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    await this.usuarioRepository.update(id, updateUsuarioDto);
    return await this.usuarioRepository.findOneBy({ id_usuario: id });
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }
}