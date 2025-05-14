import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Instituicao } from './entities/instituicao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InstituicaoService {
  constructor(
    @InjectRepository(Instituicao)
    private instituicaoRepository: Repository<Instituicao>,
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

    if(!instituicao) throw new NotFoundException('Instituição não encontrada')

    return instituicao
  }

  async update(id: number, updateInstituicaoDto: UpdateInstituicaoDto): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.findOneBy({ id_instituicao: id })

    if(!instituicao) throw new NotFoundException('Instituição não encontrada')
    
    Object.assign(instituicao, updateInstituicaoDto)

    return instituicao
  }

  async remove(id: number): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.findOneBy({ id_instituicao: id })

    if(!instituicao) throw new NotFoundException('Instituição não encontrada')

    return await this.instituicaoRepository.remove(instituicao)
  }
}
