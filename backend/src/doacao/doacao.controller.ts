import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DoacaoService } from './doacao.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('doacao')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) { }

  @Post('create')
  createDoacao(@Body() createDoacaoDto: CreateDoacaoDto) {
    return this.doacaoService.createDoacao(createDoacaoDto);
  }

  @Get('minhasDoacoes/:userId')
  findAllDoacaoByUser(@Param('userId') id: number) {
    return this.doacaoService.findAllDoacoesByUser(id);
  }

  @Get(':id')
  findOneDoacao(@Param('id') id: string) {
    return this.doacaoService.findOneDoacao(+id);
  }

  @Put(':id')
  updateDoacao(@Param('id') id: string, @Body() updateDoacaoDto: UpdateDoacaoDto) {
    return this.doacaoService.updateDoacao(+id, updateDoacaoDto);
  }

  // @Delete(':id')
  // removeDoaca(@Param('id') id: string) {
  //   return this.doacaoService.removeDoacao(+id);
  // }



  /* ITEMS */

  
  @Get('items/allItems')
  findAllItems() {
    return this.doacaoService.findAllItems();
  }
  // @Post('createItem')
  // createItem(@Body() createItemDto: CreateItemDto) {
  //   return this.doacaoService.createItem(createItemDto);
  // }
  
  // @Get('oneItem/:id')
  // findOneItem(@Param('id') id: string) {
  //   return this.doacaoService.findOneItem(+id);
  // }

  // @Put('updateItem/:id')
  // updateItem(@Param('id') id: string, @Body() updateDoacaoDto: UpdateDoacaoDto) {
  //   return this.doacaoService.updateItem(+id, updateDoacaoDto);
  // }

  // @Delete('removeItem/:id')
  // removeItem(@Param('id') id: string) {
  //   return this.doacaoService.removeItem(+id);
  // }

}
