import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioRequest } from '../models/request/usuarioRequest';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { UsuarioResponse } from '../models/response/usuarioResponse';
import { DeleteResult } from 'typeorm';
import { UsuarioRequestComum } from '../models/request/usuarioRequestComum';

@Controller('/usuarios')
export class UsuarioController {

  constructor(private readonly service: UsuarioService) {
  }

  @Post()
  createUsuario(@Body() usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
    return this.service.criarUsuario(usuarioRequest);
  }

  @Post('/comum')
  createUsuarioComum(@Body() request: UsuarioRequestComum): Promise<UsuarioResponse> {
    return this.service.criarUsuarioComum(request);
  }

  @Get()
  async listarUsuario(@Query() { page, size, filter }): Promise<PageableResponse<UsuarioResponse>> {
    return this.service.listarTodosUsuarios(page, size, filter);
  }

  @Get('/:id')
  buscarUsuarioPorId(@Param('id') id: string): Promise<UsuarioResponse> {
    return this.service.buscarPorId(id);
  }


  @Put('/:id')
  alterarUsuario(@Param('id') id: string, @Body() usuario: UsuarioRequest): Promise<UsuarioResponse> {
    return this.service.atualizarUsario(id, usuario);
  }

  @Put('/modificarStatus/:id')
  @HttpCode(204)
  alterarStatusUsuario(@Param('id') id: string): void{
     this.service.atualizarStatus(id);
  }

  @Delete('/:id')
  @HttpCode(204)
  deletarUsuario(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarUsuario(id);
  }

}