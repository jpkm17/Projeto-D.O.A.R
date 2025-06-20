import { Module } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Instituicao } from './entities/instituicao.entity';
import { Campanha } from './entities/campanha.entity';
import { NecessidadeCampanha } from './entities/necessidadeCampanha.entity';
import { Item } from 'src/doacao/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Instituicao, Campanha, NecessidadeCampanha, Item])],
  controllers: [InstituicaoController],
  providers: [InstituicaoService],
})
export class InstituicaoModule {}
