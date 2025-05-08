import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Instituicao } from './entities/instituicao.entity';

@Controller('instituicao')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Post('create')
  create(@Body() createInstituicaoDto: CreateInstituicaoDto): Promise<Instituicao> {
    return this.instituicaoService.create(createInstituicaoDto);
  }

  @Get('all')
  findAll(): Promise<Instituicao[]> {
    return this.instituicaoService.findAll();
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
}
