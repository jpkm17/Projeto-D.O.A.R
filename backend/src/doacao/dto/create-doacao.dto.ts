import { IsString, IsOptional, IsNumber, IsInt, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';

export enum StatusDoacao {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export class CreateDoacaoDto {
  // @IsDateString()
  // data: Date;

  // @IsOptional()
  // @IsString()
  // observacao?: string;

  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  // @IsEnum(StatusDoacao)
  // status: StatusDoacao;

  // @IsOptional()
  // @IsString()
  // comprovanteDoacaoUrl?: string;

  // @IsInt()
  // idInstituicao: number;

  // @IsOptional()
  // @IsInt()
  // idCampanha?: number;

  // @IsInt()
  // idFormaPagamento: number;
}
