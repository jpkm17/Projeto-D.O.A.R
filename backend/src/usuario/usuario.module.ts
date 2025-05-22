import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,]),
  JwtModule.register({
    secret: "DameDameDameio", // Em produção, use variáveis de ambiente
    signOptions: { expiresIn: '1h' }, // Token expira em 1 hora
  }),
  ],

  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule { }
