import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioRequest } from '../models/request/usuarioRequest';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { UsuarioResponse } from '../models/response/usuarioResponse';
import { DeleteResult } from 'typeorm';
import { UsuarioRequestComum } from '../models/request/usuarioRequestComum';
import { PreAuthorize } from '../../security/guard/decorators/PreAuthorize.decorator';
import { Roles } from '../../role/models/enum/Roles';
import { AutenticacaoGuard } from '../../security/guard/AutenticacaoGuard';
import { RolesGuard } from '../../security/guard/roleGuard';
import { Public } from '../../security/guard/decorators/Public.decorator';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AutenticacaoGuard,RolesGuard)
@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {

  constructor(private readonly service: UsuarioService) {
  }

  @Post()
  @PreAuthorize([Roles.MASTER])
  createUsuario(@Body() usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
    return this.service.criarUsuario(usuarioRequest);
  }


  @Post('/comum')
  @Public()
  createUsuarioComum(@Body() request: UsuarioRequestComum): Promise<UsuarioResponse> {
    return this.service.criarUsuarioComum(request);
  }

  @Get()
  @PreAuthorize([Roles.MASTER, Roles.ADMIN])
  async listarUsuarios(@Query() { page, size, filter }): Promise<PageableResponse<UsuarioResponse>> {
    return this.service.listarTodosUsuarios(page, size, filter);
  }

  @Get('/:id')
  @PreAuthorize([Roles.MASTER, Roles.ADMIN])
  buscarUsuarioPorId(@Param('id') id: string): Promise<UsuarioResponse> {
    return this.service.buscarPorId(id);
  }


  @Put('/:id')
  @PreAuthorize([Roles.MASTER])
  alterarUsuario(@Param('id') id: string, @Body() usuario: UsuarioRequest): Promise<UsuarioResponse> {
    return this.service.atualizarUsario(id, usuario);
  }

  @Put('/modificarStatus/:id')
  @PreAuthorize([Roles.MASTER])
  @HttpCode(204)
  alterarStatusUsuario(@Param('id') id: string): void{
     this.service.atualizarStatus(id).finally();
  }

  @Delete('/:id')
  @PreAuthorize([Roles.MASTER])
  @HttpCode(204)
  deletarUsuario(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarUsuario(id);
  }

}