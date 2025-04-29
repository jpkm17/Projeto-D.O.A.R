import { IsString, IsOptional } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  rua: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  cep: string;

  @IsOptional()
  @IsString()
  complemento?: string;
}
