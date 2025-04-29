import { IsString, IsEmail, Length, IsOptional, IsInt } from 'class-validator';

export class CreateInstituicaoDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(11, 14)
  cnpj: string;

  @IsString()
  telefone: string;

  @IsOptional()
  @IsInt()
  idEndereco?: number;
}
