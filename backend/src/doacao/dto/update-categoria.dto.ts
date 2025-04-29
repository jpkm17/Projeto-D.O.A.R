import { IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class UpdateCategoriaDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
