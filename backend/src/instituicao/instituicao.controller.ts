import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Instituicao } from './entities/instituicao.entity';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { Campanha } from './entities/campanha.entity';

@Controller('instituicao')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) { }

  @Post('create')
  create(@Body() createInstituicaoDto: CreateInstituicaoDto): Promise<Instituicao> {
    return this.instituicaoService.create(createInstituicaoDto);
  }

  @Get('all')
  findAll(): Promise<Instituicao[]> {
    return this.instituicaoService.findAll();
  }

  @Post('allByUser')
  findAllByUser(@Body('idUser') id: number): Promise<Instituicao[]> {
    return this.instituicaoService.findAllbyUser(id);
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

  @Post('create/campain')
  createCampaign(@Body() createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    return this.instituicaoService.createCampaing(createCampanhaDto);
  }

  @Get(':id/campaings')
  findCampaingsByBusiness(@Param() id: number): Promise<Campanha[]> {
    return this.instituicaoService.findAllCampaignsByInstituicao(id);
  }

  @Delete('remove/:id')
  removeCampaing(@Param('id') id: string): Promise<Campanha> {
    return this.instituicaoService.removeCampaing(+id);
  }

}
