import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateItemDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsNumber()
  valorReferencia: number;

  @IsString()
  unidadeMedida: string;

  @IsOptional()
  @IsString()
  imagemUrl?: string;

  @IsInt()
  idCategoria: number;
}
