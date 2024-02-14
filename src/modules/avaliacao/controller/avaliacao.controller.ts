import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { AvaliacaoService } from '../service/avaliacao.service';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { AvaliacaoResponse } from '../models/response/avaliacaoResponse';
import { AvaliacaoRequest } from '../models/request/avaliacaoRequest';
import { AvaliacaoNotaResponse } from '../models/response/avaliacaoNotaResponse';

@Controller('/avaliacoes')
export class AvaliacaoController {

  constructor(private readonly service: AvaliacaoService) {
  }

  @Get()
  async listarAvaliacoes(@Query() { page, size, filter }): Promise<PageableResponse<AvaliacaoResponse>> {
    return this.service.listarTodos(page, size, filter);
  }

  @Get('/user/:id')
  async listarAvaliacoesPorUsuario(@Param('id') id: string, @Query() {
    page,
    size,
    filter,
  }): Promise<PageableResponse<AvaliacaoResponse>> {
    return this.service.listarTodosPorUsuario(id, page, size, filter);
  }

  @Get('/nota/:filmeId/:usuarioId')
  async notaAvaliacao(@Param('filmeId') filmeId: string,
                    @Param('usuarioId') usuarioId: string): Promise<AvaliacaoNotaResponse> {
    return this.service.notaAvaliacao(filmeId, usuarioId);
  }

  @Post()
  @HttpCode(204)
  async avaliarFilme(@Body() avaliacao: AvaliacaoRequest): Promise<void> {
    await this.service.avaliar(avaliacao);
  }


}