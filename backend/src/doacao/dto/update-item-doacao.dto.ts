import { IsOptional, IsInt, IsNumber } from 'class-validator';

export class UpdateItemDoacaoDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsInt()
  quantidade?: number;

  @IsOptional()
  @IsNumber()
  valorUnitario?: number;

  @IsOptional()
  @IsNumber()
  doacaoMonetaria?: number;

  @IsOptional()
  @IsInt()
  idDoacao?: number;

  @IsOptional()
  @IsInt()
  idItem?: number;
}
