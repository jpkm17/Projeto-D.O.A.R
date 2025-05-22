import { IsString, IsEmail, Length, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

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

  // @IsString()
  // @IsNotEmpty()
  // telefone: string;

  // @IsOptional()
  // @IsInt()
  // idEndereco?: number;

  @IsString()
  @IsOptional()
  descricao: string;

  @IsString()
  @IsOptional()
  areas_atuacao: string;

  @IsString()
  @IsOptional()
  capacidade_receptacao: string;

  @IsString()
  @IsOptional()
  horario_funcionamento: string;
}
