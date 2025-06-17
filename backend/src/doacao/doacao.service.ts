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
import { Instituicao } from 'src/instituicao/entities/instituicao.entity';
import { Campanha } from 'src/instituicao/entities/campanha.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

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
    @InjectRepository(Instituicao)
    private instituicaoRepository: Repository<Instituicao>,
    @InjectRepository(Campanha)
    private campanhaRepository: Repository<Campanha>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  /* DOACAO */
  async createDoacao(createDoacaoDto: CreateDoacaoDto) {
    // const doacao = await this.doacaoRepository.create(createDoacaoDto)

    const { data, formaPagamento, idCampanha, idUser, valorTotal, status, comprovanteDoacaoUrl } = createDoacaoDto

    const user = await this.usuarioRepository.findOneBy({ id_usuario: idUser });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado, tente novamente!');
    }

    const campanha = await this.campanhaRepository.findOne({
      where: { id: idCampanha },
      relations: ['instituicao'],
    });
    if (!campanha) {
      throw new NotFoundException('Campanha não encontrada, tente novamente!');
    }

    const instituicao = campanha.instituicao;
    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada, tente novamente!');
    }

    let doacao = new Doacao()
    doacao.data = data
    doacao.campanha = campanha
    doacao.doador = user
    doacao.instituicao = instituicao
    doacao.formaPagamento = formaPagamento
    doacao.status = status
    doacao.valorTotal = valorTotal
    doacao.comprovanteDoacaoUrl = comprovanteDoacaoUrl

    
    try {
      await this.doacaoRepository.save(doacao)
      
    } catch (error) {
      throw new Error('Algo deu errado tente novamente mais tarde')
    }


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

  async findAllItems(): Promise<Item[]> {
    return await this.itemRepository.find()
  }

  // async createItem(createItemDto: CreateItemDto): Promise<Item> {
  //   const item = await this.itemRepository.create(createItemDto)

  //   return item;
  // }
  // async findOneItem(id: number): Promise<Item> {
  //   const item = await this.itemRepository.findOneBy({ id })

  //   if (!item) throw new NotFoundException('Instituição não encontrada')

  //   return item
  // }

  // async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
  //   const item = await this.itemRepository.findOneBy({ id })

  //   if (!item) throw new NotFoundException('Instituição não encontrada')

  //   Object.assign(item, updateItemDto)

  //   return item
  // }

  // async removeItem(id: number): Promise<Item> {
  //   const item = await this.itemRepository.findOneBy({ id })

  //   if (!item) throw new NotFoundException('Instituição não encontrada')

  //   return await this.itemRepository.remove(item)
  // }
}
