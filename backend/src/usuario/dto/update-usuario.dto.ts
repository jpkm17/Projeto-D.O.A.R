import { IsString, IsEmail, IsDateString, IsPhoneNumber, IsOptional, IsEnum } from 'class-validator';


export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: Date;

  @IsPhoneNumber('BR')
  @IsOptional()
  telefone?: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  telefone2?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  senha?: string;


}