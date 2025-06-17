import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Instituicao } from './entities/instituicao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campanha } from './entities/campanha.entity';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { CreateNecessidadeCampanhaDto } from './dto/create-necessidade-campanha.dto';
import { NecessidadeCampanha } from './entities/necessidadeCampanha.entity';
import { Item } from 'src/doacao/entities/item.entity';

@Injectable()
export class InstituicaoService {
  constructor(
    @InjectRepository(Instituicao)
    private instituicaoRepository: Repository<Instituicao>,
    @InjectRepository(Campanha)
    private campanhaRepository: Repository<Campanha>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(NecessidadeCampanha)
    private necessidadeCampanhaRepository: Repository<NecessidadeCampanha>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) { }

  async create(createInstituicaoDto: CreateInstituicaoDto): Promise<Instituicao> {

    const { idUser, ...rest } = createInstituicaoDto
    const { cnpj } = createInstituicaoDto

    let instituicao = await this.instituicaoRepository.findOneBy({ cnpj })

    if (instituicao) {
      throw new BadRequestException("Esse cnpj ja esta sendo utilizado")
    }

    const user = await this.usuarioRepository.findOneBy({ id_usuario: idUser })

    if (!user) {
      throw new BadRequestException("Erro: não foi possivel criar instituicao")
    }

    instituicao = this.instituicaoRepository.create(createInstituicaoDto)
    instituicao.administrador = user


    try {
      await this.instituicaoRepository.save(instituicao)
    } catch (error) {
      throw new BadRequestException(`Erro ao cadastrar instituicao, ${error}`)
    }

    return instituicao;
  }

  async findAll(): Promise<Instituicao[]> {
    return await this.instituicaoRepository.find()
  }

  async findOne(id: number): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.findOneBy({ id_instituicao: id })

    if (!instituicao) throw new NotFoundException('Instituição não encontrada')

    return instituicao
  }

  async findAllbyUser(id: number): Promise<Instituicao[]> {
    // Buscando o usuário com a opção de "where"
    const user = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });

    // Se o usuário não for encontrado, lançar exceção
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Buscando as instituições relacionadas ao usuário
    const instituicoes = await this.instituicaoRepository.find({
      where: { administrador: { id_usuario: id } },  // Garantindo que estamos buscando pela chave correta do usuário
      relations: ['administrador'],
    });

    // Se não houver instituições, lançar exceção
    if (instituicoes.length === 0) {
      throw new NotFoundException('Instituições não encontradas');
    }

    return instituicoes;
  }

  async update(id: number, updateInstituicaoDto: UpdateInstituicaoDto): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.findOneBy({ id_instituicao: id })

    if (!instituicao) throw new NotFoundException('Instituição não encontrada')

    Object.assign(instituicao, updateInstituicaoDto)

    await this.instituicaoRepository.save(instituicao)

    return instituicao
  }

  async remove(id: number): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.findOneBy({ id_instituicao: id })

    if (!instituicao) throw new NotFoundException('Instituição não encontrada')

    return await this.instituicaoRepository.remove(instituicao)
  }



  async createCampaing(createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    // Extrai o instituicaoId e remove do DTO
    const { instituicaoId, ...campanhaData } = createCampanhaDto;

    // Aqui você pode usar o instituicaoId para buscar a entidade da instituição, por exemplo:
    const instituicao = await this.instituicaoRepository.findOne({ where: { id_instituicao: instituicaoId } });

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada');
    }

    // Cria a campanha com os dados restantes
    const campanha = this.campanhaRepository.create(campanhaData);

    // Associa a instituição, se necessário
    campanha.instituicao = instituicao;

    await this.campanhaRepository.save(campanha);

    return campanha;
  }

  async findAllCampaignsByInstituicao(id: number): Promise<Campanha[]> {
    const campanhas = await this.campanhaRepository.find({
      where: { instituicao: { id_instituicao: id } },
      relations: ['instituicao'],
    });

    return campanhas;
  }

  async findOneCampaign(id: number): Promise<Campanha> {
    const campanha = await this.campanhaRepository.findOneBy({ id })

    if (!campanha) throw new NotFoundException('Campanha não encontrada')

    return campanha
  }


  async updateCampaign(updateCampaingDto: UpdateCampanhaDto): Promise<Campanha> {

    console.log(updateCampaingDto)

    const { id, ...campanhaData } = updateCampaingDto

    const campanha = await this.campanhaRepository.findOneBy({ id })

    if (!campanha) throw new NotFoundException('Instituição não encontrada')

    Object.assign(campanha, updateCampaingDto)

    await this.campanhaRepository.save(campanha)

    return campanha
  }

  async removeCampaing(id: number): Promise<Campanha> {
    const campanha = await this.campanhaRepository.findOneBy({ id: id })

    if (!campanha) throw new NotFoundException('campanha não encontrada')

    return await this.campanhaRepository.remove(campanha)
  }


  /* NECESSIDADE CAMPANHA */

  async criar(criarNecessidadeCampanhaDto: CreateNecessidadeCampanhaDto): Promise<NecessidadeCampanha> {
    const { idCampanha, idItem, quantidadeNecessaria, quantidadeRecebida, observacao } = criarNecessidadeCampanhaDto;

    console.log('comecei o criar')

    // Verificar se a campanha existe e está ativa
    const campanha = await this.campanhaRepository.findOne({
      where: { id: idCampanha, ativa: true }
    });


    if (!campanha) {
      throw new NotFoundException('Campanha não encontrada ou inativa');
    }

    // Verificar se o item existe e está ativo
    const item = await this.itemRepository.findOne({
      where: { id: idItem, ativo: true }
    });

    if (!item) {
      throw new NotFoundException('Item não encontrado ou inativo');
    }

    // Verificar se já existe uma necessidade para este item nesta campanha
    const necessidadeExistente = await this.necessidadeCampanhaRepository.findOne({
      where: {
        campanha: { id: idCampanha },
        item: { id: idItem }
      }
    });

    if (necessidadeExistente) {
      throw new BadRequestException('Este item já foi adicionado a esta campanha');
    }

    // Criar a necessidade da campanha
    const necessidadeCampanha = this.necessidadeCampanhaRepository.create({
      quantidadeNecessaria,
      quantidadeRecebida: quantidadeRecebida || 0,
      observacao,
      campanha,
      item
    });

    console.log(necessidadeCampanha)

    return await this.necessidadeCampanhaRepository.save(necessidadeCampanha);
  }

  async buscarPorCampanha(campanhaId: number): Promise<NecessidadeCampanha[]> {
    return await this.necessidadeCampanhaRepository.find({
      where: { campanha: { id: campanhaId } },
      relations: ['item', 'item.categoria'],
      order: { id: 'ASC' }
    });
  }

  async buscarPorId(id: number): Promise<NecessidadeCampanha> {
    const necessidade = await this.necessidadeCampanhaRepository.findOne({
      where: { id },
      relations: ['campanha', 'item', 'item.categoria']
    });

    if (!necessidade) {
      throw new NotFoundException('Necessidade não encontrada');
    }

    return necessidade;
  }

  async atualizar(id: number, dadosAtualizacao: Partial<CreateNecessidadeCampanhaDto>): Promise<NecessidadeCampanha> {
    const necessidade = await this.buscarPorId(id);

    // Atualizar apenas os campos permitidos
    if (dadosAtualizacao.quantidadeNecessaria !== undefined) {
      necessidade.quantidadeNecessaria = dadosAtualizacao.quantidadeNecessaria;
    }

    if (dadosAtualizacao.quantidadeRecebida !== undefined) {
      necessidade.quantidadeRecebida = dadosAtualizacao.quantidadeRecebida;
    }

    if (dadosAtualizacao.observacao !== undefined) {
      necessidade.observacao = dadosAtualizacao.observacao;
    }

    return await this.necessidadeCampanhaRepository.save(necessidade);
  }

  async remover(id: number): Promise<void> {
    const necessidade = await this.buscarPorId(id);
    await this.necessidadeCampanhaRepository.remove(necessidade);
  }

  async calcularProgresso(campanhaId: number): Promise<any> {
    const necessidades = await this.buscarPorCampanha(campanhaId);

    let totalNecessario = 0;
    let totalRecebido = 0;

    for (const necessidade of necessidades) {
      totalNecessario += necessidade.quantidadeNecessaria;
      totalRecebido += necessidade.quantidadeRecebida;
    }

    const percentualCompleto = totalNecessario > 0 ? (totalRecebido / totalNecessario) * 100 : 0;

    return {
      totalItens: necessidades.length,
      totalNecessario,
      totalRecebido,
      percentualCompleto: Math.round(percentualCompleto * 100) / 100,
      itensCompletos: necessidades.filter(n => n.quantidadeRecebida >= n.quantidadeNecessaria).length
    };
  }

}
