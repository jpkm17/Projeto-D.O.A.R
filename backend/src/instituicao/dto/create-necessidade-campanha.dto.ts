import { IsInt } from 'class-validator';

export class CreateNecessidadeCampanhaDto {
  @IsInt()
  idCampanha: number;

  @IsInt()
  idItem: number;
}
