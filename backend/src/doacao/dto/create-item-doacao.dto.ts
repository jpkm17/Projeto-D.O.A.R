import { Doacao } from "../../doacao/entities/doacao.entity";
import { IsInt, IsNumber } from 'class-validator';

export class CreateItemDoacaoDto {
  @IsInt()
  quantidade: number;

  @IsNumber()
  valorUnitario: number;

  @IsNumber()
  doacaoMonetaria: number;

  @IsInt()
  idDoacao: number;

  @IsInt()
  idItem: number;
}
