import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Usuario } from "./entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    // : Promise<Usuario>
    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        // Verificar se o email já existe
        const emailExists = await this.usuarioRepository.findOne({ 
            where: { email: createUsuarioDto.email } 
        });
        
        if (emailExists) {
            throw new BadRequestException('Este email já está em uso');
        }
        
        // Verificar se o CPF já existe
        const cpfExists = await this.usuarioRepository.findOne({ 
            where: { cpf: createUsuarioDto.cpf } 
        });
        
        if (cpfExists) {
            throw new BadRequestException('Este CPF já está cadastrado');
        }
        
        try {
            // Criar a instância do usuário
            const usuario = this.usuarioRepository.create(createUsuarioDto);
            
            // A entidade Usuario já tem o @BeforeInsert para hash da senha,
            // então não precisamos fazer hash aqui
            
            // Salvar o usuário no banco
            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new InternalServerErrorException('Ocorreu um erro ao processar seu cadastro');
        }
    }

    async findAll(): Promise<Usuario[]> {
        const usuario = await this.usuarioRepository.find()
        return usuario
    }

}