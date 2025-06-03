import { IsString, IsEmail, Length, IsOptional, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInstituicaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  nome_fantasia: string;

  @IsString()
  @IsOptional()
  razao_social: string;

  @IsString()
  @Length(11, 14)
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsOptional()
  descricao: string;

  @IsNotEmpty()
  idUser: number; //Para relacionar o user com a instituicao
}
