import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { CreateEnderecoDto } from '../../endereco/dto/create-endereco.dto';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString({ message: 'O nome deve ser uma string' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres' })
  nome: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email inválido' })
  @Length(11, 100, { message: 'email deve ter no maximo 50 caracteres' })
  email: string;
  
  @IsNotEmpty()
  @IsString({ message: 'A senha deve ser uma string' })
  @Length(6, 100, { message: 'A senha deve ter entre 6 e 100 caracteres' })
  senha: string;

  // @IsString({ message: 'A senha deve ser uma string' })
  // @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  // @MaxLength(100, { message: 'A senha deve ter no máximo 100 caracteres' })
  // confimar_senha: string;

  @IsNotEmpty()
  @IsString({ message: 'O CPF deve ser uma string' })
  @Length(11, 14, { message: 'O CPF deve ter entre 11 e 14 caracteres' })
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/, { message: 'Formato de CPF inválido, só utilize numeros' })
  cpf: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string' })
  @MaxLength(20, { message: 'O telefone deve ter no máximo 20 caracteres' })
  telefone?: string;

  // @IsOptional()
  // endereco?: CreateEnderecoDto;
}