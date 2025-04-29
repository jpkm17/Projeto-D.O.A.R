import { IsString, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsBoolean()
  ativo: boolean;
}
