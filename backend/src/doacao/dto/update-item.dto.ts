import { IsOptional, IsString, IsNumber, IsInt } from 'class-validator';

export class UpdateItemDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsNumber()
  valorReferencia?: number;

  @IsOptional()
  @IsString()
  unidadeMedida?: string;

  @IsOptional()
  @IsString()
  imagemUrl?: string;

  @IsOptional()
  @IsInt()
  idCategoria?: number;
}
