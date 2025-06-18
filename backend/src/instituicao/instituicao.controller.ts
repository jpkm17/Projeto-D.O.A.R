import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Instituicao } from './entities/instituicao.entity';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { Campanha } from './entities/campanha.entity';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { CreateNecessidadeCampanhaDto } from './dto/create-necessidade-campanha.dto';

@Controller('instituicao')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) { }

  /* Instituição */

  @Post('create')
  create(@Body() createInstituicaoDto: CreateInstituicaoDto): Promise<Instituicao> {
    return this.instituicaoService.create(createInstituicaoDto);
  }

  @Get('all')
  findAll(): Promise<Instituicao[]> {
    return this.instituicaoService.findAll();
  }

  @Post('allByUser')
  findAllByUser(@Body('idUser') id: number) {
    // return this.instituicaoService.findAllbyUser(id);
    return this.instituicaoService.findUsuarioComInstituicoes(id)
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string): Promise<Instituicao> {
    return this.instituicaoService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateInstituicaoDto: UpdateInstituicaoDto): Promise<Instituicao> {
    return this.instituicaoService.update(+id, updateInstituicaoDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string): Promise<Instituicao> {
    return this.instituicaoService.remove(+id);
  }


  /* CAMPANHA */

  @Post('create/campaign')
  createCampaign(@Body() createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    return this.instituicaoService.createCampaing(createCampanhaDto);
  }

  @Get('getOne/campaign/:id')
  findOneCampaign(@Param('id') id: string): Promise<Campanha> {
    return this.instituicaoService.findOneCampaign(+id);
  }

  @Put('campaign/update')
  updateCampaing(@Body() updateCampanhaDto: UpdateCampanhaDto): Promise<Campanha> {
    return this.instituicaoService.updateCampaign(updateCampanhaDto);
  }

  @Get(':id/campaigns')
  findCampaingsByBusiness(@Param('id') id: string): Promise<Campanha[]> {
    return this.instituicaoService.findAllCampaignsByInstituicao(+id);
  }

  @Delete('remove/:id')
  removeCampaing(@Param('id') id: string): Promise<Campanha> {
    return this.instituicaoService.removeCampaing(+id);
  }


  /* NECESSIDADE CAMPANHA */

  @Post('adicionar/necessidadeCampanha')
  async criarNecessidade(
    @Body() criarNecessidadeCampanhaDto: CreateNecessidadeCampanhaDto
  ) {
    try {
      // console.log(criarNecessidadeCampanhaDto)

      const necessidade = await this.instituicaoService.criar(criarNecessidadeCampanhaDto);

      return {
        success: true,
        message: 'Necessidade adicionada com sucesso',
        data: necessidade
      };
    } catch (error) {
      return {
        success: false,
        message: error.message + 'erro aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        data: null
      };
    }
  }

  @Get('campanha/:campanhaId/necessidades')
  async buscarNecessidadesPorCampanha(@Param('campanhaId', ParseIntPipe) campanhaId: number) {
    try {
      const necessidades = await this.instituicaoService.buscarPorCampanha(campanhaId);

      return {
        success: true,
        message: 'Necessidades encontradas',
        data: necessidades
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  @Get('campanha/:campanhaId/progresso')
  async buscarProgressoCampanha(@Param('campanhaId', ParseIntPipe) campanhaId: number) {
    try {
      const progresso = await this.instituicaoService.calcularProgresso(campanhaId);

      return {
        success: true,
        message: 'Progresso calculado',
        data: progresso
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  @Get('necessidade/:id')
  async buscarNecessidadePorId(@Param('id', ParseIntPipe) id: number) {
    try {
      const necessidade = await this.instituicaoService.buscarPorId(id);

      return {
        success: true,
        message: 'Necessidade encontrada',
        data: necessidade
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  @Put('necessidade/:id')
  async atualizarNecessidade(
    @Param('id', ParseIntPipe) id: number,
    @Body() dadosAtualizacao: Partial<CreateNecessidadeCampanhaDto>
  ) {
    try {
      const necessidade = await this.instituicaoService.atualizar(id, dadosAtualizacao);

      return {
        success: true,
        message: 'Necessidade atualizada com sucesso',
        data: necessidade
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  @Delete('necessidade/:id')
  async removerNecessidade(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.instituicaoService.remover(id);

      return {
        success: true,
        message: 'Necessidade removida com sucesso',
        data: null
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }


}
