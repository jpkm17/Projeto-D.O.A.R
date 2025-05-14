import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DoacaoService } from './doacao.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('doacao')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) { }

  @Post()
  createDoacao(@Body() createDoacaoDto: CreateDoacaoDto) {
    return this.doacaoService.createDoacao(createDoacaoDto);
  }

  @Get()
  findAllDoacao() {
    return this.doacaoService.findAllDoacoes();
  }

  @Get(':id')
  findOneDoacao(@Param('id') id: string) {
    return this.doacaoService.findOneDoacao(+id);
  }

  @Put(':id')
  updateDoacao(@Param('id') id: string, @Body() updateDoacaoDto: UpdateDoacaoDto) {
    return this.doacaoService.updateDoacao(+id, updateDoacaoDto);
  }

  @Delete(':id')
  removeDoaca(@Param('id') id: string) {
    return this.doacaoService.removeDoacao(+id);
  }



  /* ITEMS */

  @Post('createItem')
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.doacaoService.createItem(createItemDto);
  }

  @Get('items')
  findAllItems() {
    return this.doacaoService.findAllItems();
  }

  @Get('item/:id')
  findOneItem(@Param('id') id: string) {
    return this.doacaoService.findOneItem(+id);
  }

  @Put('updateItem/:id')
  updateItem(@Param('id') id: string, @Body() updateDoacaoDto: UpdateDoacaoDto) {
    return this.doacaoService.updateItem(+id, updateDoacaoDto);
  }

  @Delete('removeItem/:id')
  removeItem(@Param('id') id: string) {
    return this.doacaoService.removeItem(+id);
  }

}
