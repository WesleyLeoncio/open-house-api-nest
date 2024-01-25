import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { DeleteResult } from 'typeorm';
import { CategoriaRequest } from '../models/request/categoria.request';

@Controller('/categorias')
export class CategoriaController {

  constructor(private readonly service: CategoriaService) {
  }

  @Get()
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