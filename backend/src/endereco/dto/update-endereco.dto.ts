import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateEnderecoDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  rua?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  complemento?: string;
}
