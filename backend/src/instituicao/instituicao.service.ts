import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Instituicao } from './entities/instituicao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campanha } from './entities/campanha.entity';
import { CreateCampanhaDto } from './dto/create-campanha.dto';

@Injectable()
export class InstituicaoService {
  constructor(
    @InjectRepository(Instituicao)
    private instituicaoRepository: Repository<Instituicao>,
    @InjectRepository(Campanha)
    private campanhaRepository: Repository<Campanha>,
  ) { }

  async create(createInstituicaoDto: CreateInstituicaoDto): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.create(createInstituicaoDto)

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

  async update(id: number, updateInstituicaoDto: UpdateInstituicaoDto): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.findOneBy({ id_instituicao: id })

    if (!instituicao) throw new NotFoundException('Instituição não encontrada')

    Object.assign(instituicao, updateInstituicaoDto)

    return instituicao
  }

  async remove(id: number): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.findOneBy({ id_instituicao: id })

    if (!instituicao) throw new NotFoundException('Instituição não encontrada')

    return await this.instituicaoRepository.remove(instituicao)
  }

  async createCampaing(createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    const campanha = await this.campanhaRepository.create(createCampanhaDto)

    return campanha;
  }


  async findAllCampaignsByInstituicao(id: number): Promise<Campanha[]> {
    const campanhas = await this.campanhaRepository.find({
      where: { instituicao: { id_instituicao: id } },
      relations: ['instituicao'],
    });

    return campanhas;
  }


  async removeCampaing(id: number): Promise<Campanha> {
    const campanha = await this.campanhaRepository.findOneBy({ id: id })

    if (!campanha) throw new NotFoundException('campanha não encontrada')

    return await this.campanhaRepository.remove(campanha)
  }

}
