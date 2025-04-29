import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateCampanhaDto {
  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsDateString()
  dataInicio: Date;

  @IsDateString()
  dataFim: Date;

  @IsOptional()
  @IsString()
  imagemUrl?: string;
}
