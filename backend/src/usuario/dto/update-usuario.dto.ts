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
  
  export class UpdateUsuarioDto {
    @IsOptional()
    @IsString()
    @Length(3, 100)
    nome?: string;
  
    @IsOptional()
    @IsDateString()
    dataNascimento?: Date;
  
    @IsOptional()
    @IsString()
    @Matches(/^\+?\d{10,15}$/)
    telefone?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^\+?\d{10,15}$/)
    telefone2?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    @Length(6, 40)
    senha?: string;
  
    @IsOptional()
    @IsEnum(UserRole)
    tipoConta?: UserRole;
  }
