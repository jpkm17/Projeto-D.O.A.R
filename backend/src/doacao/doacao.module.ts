import { Module } from '@nestjs/common';
import { DoacaoService } from './doacao.service';
import { DoacaoController } from './doacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doacao } from './entities/doacao.entity';
import { Categoria } from './entities/categoria.entity';
import { Item } from './entities/item.entity';
import { ItemDoacao } from './entities/itemDoacao.entity';
import { FormaPagamento } from './entities/formaPagamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doacao, Categoria, Item, ItemDoacao, FormaPagamento])],
  controllers: [DoacaoController],
  providers: [DoacaoService],
})
export class DoacaoModule {}
