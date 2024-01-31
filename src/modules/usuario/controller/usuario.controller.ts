import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioRequest } from '../models/request/usuarioRequest';

@Controller('/usuarios')
export class UsuarioController {

  constructor(private readonly service: UsuarioService) {
  }

  @Post()
  createUsuario(@Body() usuarioRequest: UsuarioRequest){
    return this.service.createUsuario(usuarioRequest);
  }

  @Get()
  getUsuarios(@Query() { page, size, filter }) {
    return this.service.getUsuarios(page, size, filter);
  }
}