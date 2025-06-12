import { IsOptional, IsString, IsDateString, IsInt, IsBoolean, IsDate } from 'class-validator';

export class UpdateCampanhaDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsDateString()
  dataInicio?: Date;

  @IsOptional()
  @IsDateString()
  dataFim?: Date;

  @IsBoolean()
  ativo: boolean;
}
