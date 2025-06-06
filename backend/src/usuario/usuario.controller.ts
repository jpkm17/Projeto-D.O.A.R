import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

export class LoginDto {
  email: string;
  senha: string;
}

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post('register')
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usuarioService.login(loginDto.email, loginDto.senha);
  }

  @Post('validarToken')
  validarToken(@Body('token') token: string) {
    return this.usuarioService.validarToken(token)
  }

  @Get('all')
  findAll() {
    return this.usuarioService.findAll()
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
