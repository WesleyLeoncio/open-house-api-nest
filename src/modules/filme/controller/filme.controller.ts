import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { FilmeService } from '../service/filme.service';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { FilmeResponse } from '../models/response/filmeResponse';
import { DeleteResult } from 'typeorm';
import { FilmeRequest } from '../models/request/filme.request';

@Controller('/filmes')
export class FilmeController {
  constructor(private readonly service: FilmeService) {
  }

  @Get()
  async listarFilmes(@Query() { page, size, filter }): Promise<PageableResponse<FilmeResponse>> {
    return this.service.listarTodosFilmes(page, size, filter);
  }

  @Get('/:id')
  buscarFilmePorId(@Param('id') id: string): Promise<FilmeResponse> {
    return this.service.buscarPorId(id);
  }

  @Post()
  criarFilme(@Body() filme: FilmeRequest): Promise<FilmeResponse> {
    return this.service.criarFilme(filme);
  }

  @Put('/:id')
  alterarFilme(@Param('id') id: string, @Body() filme: FilmeRequest): Promise<FilmeResponse> {
    return this.service.atualizarFilme(id, filme);
  }

  @Delete('/:id')
  @HttpCode(204)
  deletarFilme(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarFilme(id);
  }

}