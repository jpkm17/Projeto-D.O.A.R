import { IsString, IsEmail, IsDateString, IsPhoneNumber, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @IsString()
  nome: string;

  @IsDateString()
  dataNascimento: Date;

  @IsPhoneNumber('BR')
  telefone: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  telefone2?: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsEnum(UserRole)
  @IsOptional()
  tipoConta?: UserRole;
}
