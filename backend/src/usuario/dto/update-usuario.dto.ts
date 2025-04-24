import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsOptional, IsString, Length, Matches, MaxLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsOptional()
    @IsString({ message: 'O nome deve ser uma string' })
    @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres' })
    nome: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email inválido' })
    @Length(11, 100, { message: 'email deve ter no maximo 100 caracteres' })
    email: string;

    @IsOptional()
    @IsString({ message: 'A senha deve ser uma string' })
    @Length(6, 100, { message: 'A senha deve ter entre 6 e 100 caracteres' })
    senha: string;

    @IsOptional()
    @IsString({ message: 'A senha deve ser uma string' })
    @Length(6, 100, { message: 'A senha deve ter entre 6 e 100 caracteres' })
    confimar_senha: string;

    @IsOptional()
    @IsString({ message: 'O CPF deve ser uma string' })
    @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres' })
    @Matches(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/, { message: 'Formato de CPF inválido' })
    cpf: string;

    @IsOptional()
    @IsString({ message: 'O telefone deve ser uma string' })
    @MaxLength(20, { message: 'O telefone deve ter no máximo 20 caracteres' })
    telefone?: string;
}
