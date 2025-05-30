import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { DoacaoModule } from 'src/doacao/doacao.module';
import { InstituicaoModule } from 'src/instituicao/instituicao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis em todo o projeto
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      synchronize: true,
      // dropSchema: true,
    } as TypeOrmModuleOptions),
    UsuarioModule,
    // DoacaoModule,
    InstituicaoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
