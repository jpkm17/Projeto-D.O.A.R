import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus,
  Query
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UserRole } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  async findAll(
    @Query('tipo') tipo?: UserRole,
    @Query('email') email?: string
  ) {
    if (email) {
      const usuario = await this.usuarioService.findByEmail(email);
      return usuario ? [usuario] : [];
    }
    
    if (tipo) {
      // Implemente no service se necessário filtrar por tipo
      return await this.usuarioService.findAll();
    }
    
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    return await this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usuarioService.remove(+id);
  }
}