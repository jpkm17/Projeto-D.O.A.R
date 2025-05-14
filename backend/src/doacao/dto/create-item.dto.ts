import { IsString, IsNumber, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  valorReferencia: number;

  @IsNotEmpty()
  @IsString()
  unidadeMedida: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  imagemUrl?: string;

  @IsNotEmpty()
  @IsInt()
  idCategoria: number;
}
