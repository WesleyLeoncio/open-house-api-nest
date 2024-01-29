import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { DeleteResult } from 'typeorm';
import { CategoriaRequest } from '../models/request/categoria.request';
import { AutenticacaoGuard } from '../../security/guard/AutenticacaoGuard';
import { RolesGuard } from '../../security/guard/roleGuard';
import { PreAuthorize } from '../../security/guard/decorators/PreAuthorize.decorator';
import { Roles } from '../../role/models/enum/Roles';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseGuards(AutenticacaoGuard,RolesGuard)
@Controller('/categorias')
export class CategoriaController {

  constructor(private readonly service: CategoriaService) {
  }

  @Get()
  @PreAuthorize([Roles.ADMIN])
  @UseInterceptors(CacheInterceptor) //TODO CACHE REDIS
  getCategorias() {
    return this.service.listarTodasCategorias();
  }

  @Get('/:id')
  buscarCategoriasPorId(@Param('id') id: string) {
    return this.service.buscarPorId(id);
  }

  @Post()
  criarCategoria(@Body() categoria: CategoriaRequest) {
    return this.service.criarCategoria(categoria);
  }

  @Put('/:id')
  alterarCategoria(@Param('id') id: string, @Body() categoria: CategoriaRequest) {
    return this.service.atualizarCategoria(id, categoria);
  }

  @Delete('/:id')
  deletarCategoria(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarCategoria(id);
  }

}