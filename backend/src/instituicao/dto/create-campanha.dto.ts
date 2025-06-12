import { IsString, IsDateString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class CreateCampanhaDto {
  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsDateString()
  dataInicio: Date;

  @IsDateString()
  dataFim: Date;

  @IsNumber()
  instituicaoId: number;
}
