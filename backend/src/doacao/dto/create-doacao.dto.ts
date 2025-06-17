import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsInt, IsEnum, IsDateString, IsNotEmpty, Length, IsArray, IsDate } from 'class-validator';

export enum StatusDoacao {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export class CreateDoacaoDto {
  @IsDateString()
  data: Date;

  @IsEnum(StatusDoacao)
  status: StatusDoacao;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsOptional()
  @IsString()
  comprovanteDoacaoUrl?: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  idCampanha: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  idUser: number;

  @IsNotEmpty()
  @Length(3, 20, {message: 'formaPagamento invalida'})
  formaPagamento: string;

  @IsNotEmpty()
  @IsArray()
  itens: []
}
