import { PartialType } from '@nestjs/mapped-types';
import { CreateInstituicaoDto } from './create-instituicao.dto';
import { IsOptional, IsString, IsEmail, IsInt, Length } from 'class-validator';

export class UpdateInstituicaoDto extends PartialType(CreateInstituicaoDto) {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(11, 14)
  cnpj?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsInt()
  idEndereco?: number;
}
