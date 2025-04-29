import { IsInt, IsOptional } from 'class-validator';

export class UpdateNecessidadeCampanhaDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsInt()
  idCampanha?: number;

  @IsOptional()
  @IsInt()
  idItem?: number;
}
