import { 
    IsString, 
    IsEmail, 
    IsDateString, 
    IsOptional, 
    IsEnum, 
    Length, 
    Matches 
  } from 'class-validator';
  import { UserRole } from '../entities/usuario.entity'; 
  
  export class CreateUsuarioDto {
    @IsString()
    @Length(3, 100)
    nome: string;
  
    @IsDateString()
    dataNascimento: Date;
  
    @IsString()
    @Matches(/^\+?\d{10,15}$/)
    telefone: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^\+?\d{10,15}$/)
    telefone2?: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @Length(6, 40)
    senha: string;
  
    @IsOptional()
    @IsEnum(UserRole)
    tipoConta?: UserRole;
  }
