import { IsOptional, IsString, IsNumber, IsEnum, IsInt, IsDateString } from 'class-validator';
import { StatusDoacao } from './create-doacao.dto';

export class UpdateDoacaoDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsDateString()
  data?: Date;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsOptional()
  @IsNumber()
  valorTotal?: number;

  @IsOptional()
  @IsEnum(StatusDoacao)
  status?: StatusDoacao;

  @IsOptional()
  @IsString()
  comprovanteDoacaoUrl?: string;

  @IsOptional()
  @IsInt()
  idInstituicao?: number;

  @IsOptional()
  @IsInt()
  idCampanha?: number;

  @IsOptional()
  @IsInt()
  idFormaPagamento?: number;
}
