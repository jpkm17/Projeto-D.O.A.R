import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Usuario } from "./entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private jwtService: JwtService // Injetar o JwtService
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

        // if (createUsuarioDto.senha !== createUsuarioDto.confimar_senha) {
        //     throw new BadRequestException('Senha e confirmar senha estão divergentes');
        // }

        // Verificar se o CPF já existe
        // const cpfExists = await this.usuarioRepository.findOne({
        //     where: { cpf: createUsuarioDto.cpf }
        // });

        // if (cpfExists) {
        //     throw new BadRequestException('Este CPF já está cadastrado');
        // }

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
        return await this.usuarioRepository.find()
    }


    async findOne(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOneBy({ id_usuario: id })
        if (!usuario) throw new NotFoundException('Usuário não encontrado');

        return usuario
    }


    async update(id: number, updateUsuarioDto): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOneBy({ id_usuario: id })

        if (!usuario) throw new NotFoundException('Usuário não encontrado');

        Object.assign(usuario, updateUsuarioDto)

        return usuario
    }


    async remove(id: number): Promise<void> {
        const usuario = await this.usuarioRepository.findOneBy({ id_usuario: id })

        if (!usuario) throw new NotFoundException('Usuário não encontrado')

        await this.usuarioRepository.remove(usuario)
    }


    async login(email: string, senha: string): Promise<{ usuario: any; token: string }> {

        const usuario = await this.usuarioRepository.findOneBy({ email });

        if (!usuario)
            throw new BadRequestException('Email ou senha incorreto');


        // Comparar a senha fornecida com o hash armazenado
        const senhaCorreta = compareSync(senha, usuario.senha);

        if (!senhaCorreta)
            throw new BadRequestException('Email ou senha incorreto');
        // Gerar payload do JWT
        const payload = {
            sub: usuario.id_usuario,
            email: usuario.email,
            // Adicione outros campos que deseja incluir no token
        };

        // Gerar token JWT
        const token = this.jwtService.sign(payload);

        // Remover a senha do objeto de usuário antes de retorná-lo
        const { senha: _, ...usuarioSemSenha } = usuario;

        // Retornar o usuário e o token
        return {
            usuario: usuarioSemSenha,
            token
        };
    }


    validarToken(token: string): any {
        try {
            const payload = this.jwtService.verify(token);
            return payload; // Token válido, retorna o payload
        } catch (err) {
           throw new UnauthorizedException('Token inválido ou expirado');
        }
    }

}