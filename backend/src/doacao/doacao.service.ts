import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doacao } from './entities/doacao.entity';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { Item } from './entities/item.entity';
import { ItemDoacao } from './entities/itemDoacao.entity';
import { FormaPagamento } from './entities/formaPagamento.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class DoacaoService {
  constructor(
    @InjectRepository(Doacao)
    private doacaoRepository: Repository<Doacao>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(ItemDoacao)
    private itemDoacaoRepository: Repository<ItemDoacao>,
    @InjectRepository(FormaPagamento)
    private formaPagamentoRepository: Repository<FormaPagamento>,
  ) { }

  /* DOACAO */
  async createDoacao(createDoacaoDto: CreateDoacaoDto) {
    const doacao = await this.doacaoRepository.create(createDoacaoDto)
    return doacao;
  }

  async findAllDoacoes() {
    return await this.doacaoRepository.find()
  }

  async findOneDoacao(id: number) {
    const doacao = await this.doacaoRepository.findOneBy({ id })

    if (!doacao) throw new NotFoundException('Doacao não encontrada')

    return doacao
  }

  async updateDoacao(id: number, updateDoacaoDto: UpdateDoacaoDto) {
    const doacao = await this.itemRepository.findOneBy({ id })

    if (!doacao) throw new NotFoundException('Doacao não encontrada')

    Object.assign(doacao, updateDoacaoDto)

    return doacao
  }

  async remove(id: number) {
    const doacao = await this.itemRepository.findOneBy({ id })

    if (!doacao) throw new NotFoundException('Doacao não encontrada')

    return await this.itemRepository.remove(doacao)
  }



  /* ITEMS */
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const item = await this.itemRepository.create(createItemDto)

    return item;
  }

  async findAllItems(): Promise<Item[]> {
    return await this.itemRepository.find()
  }

  async findOneItem(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id })

    if (!item) throw new NotFoundException('Instituição não encontrada')

    return item
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id })

    if (!item) throw new NotFoundException('Instituição não encontrada')

    Object.assign(item, updateItemDto)

    return item
  }

  async removeItem(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id })

    if (!item) throw new NotFoundException('Instituição não encontrada')

    return await this.itemRepository.remove(item)
  }
}
