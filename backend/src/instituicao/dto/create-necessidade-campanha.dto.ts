import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateNecessidadeCampanhaDto {
  @Type(() => Number)
  @IsNumber()
  idCampanha: number;

  @Type(() => Number)
  @IsNumber({}, {message: 'caiu no dto'})
  idItem: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'A quantidade necessária deve ser maior que 0, caiu no dto' })
  quantidadeNecessaria: number;

  @IsOptional()
  @IsNumber()
  quantidadeRecebida?: number = 0;

  @IsString({message:'caiu no dto'})
  @IsOptional()
  observacao?: string;
}
