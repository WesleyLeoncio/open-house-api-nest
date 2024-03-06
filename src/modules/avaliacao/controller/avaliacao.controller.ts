import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AvaliacaoService } from '../service/avaliacao.service';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { AvaliacaoResponse } from '../models/response/avaliacaoResponse';
import { AvaliacaoRequest } from '../models/request/avaliacaoRequest';
import { AvaliacaoNotaResponse } from '../models/response/avaliacaoNotaResponse';
import { PreAuthorize } from '../../security/guard/decorators/PreAuthorize.decorator';
import { Roles } from '../../role/models/enum/Roles';
import { AutenticacaoGuard } from '../../security/guard/AutenticacaoGuard';
import { RolesGuard } from '../../security/guard/roleGuard';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@UseGuards(AutenticacaoGuard, RolesGuard)
@ApiTags('Endpoints De Avaliar Filmes')
@Controller('/avaliacoes')
@ApiBearerAuth('KEY_AUTH')
export class AvaliacaoController {

  constructor(private readonly service: AvaliacaoService) {
  }

  @Get()
  @PreAuthorize([Roles.USER])
  @ApiOkResponse({ type: PageableResponse<AvaliacaoResponse> })
  async listarAvaliacoes(@Query() { page, size, filter }): Promise<PageableResponse<AvaliacaoResponse>> {
    return this.service.listarTodos(page, size, filter);
  }

  @Get('/user/:id')
  @PreAuthorize([Roles.USER])
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'size', required: false, type: 'number' })
  @ApiQuery({ name: 'filter', required: false, type: 'string' })
  @ApiOkResponse({ type: PageableResponse<AvaliacaoResponse> })
  async listarAvaliacoesPorUsuario(@Param('id') id: string, @Query() {
    page,
    size,
    filter,
  }): Promise<PageableResponse<AvaliacaoResponse>> {
    return this.service.listarTodosPorUsuario(id, page, size, filter);
  }

  @Get('/nota/:filmeId/:usuarioId')
  @PreAuthorize([Roles.USER])
  @ApiOkResponse({ type: AvaliacaoNotaResponse })
  async notaAvaliacao(@Param('filmeId') filmeId: string,
                      @Param('usuarioId') usuarioId: string): Promise<AvaliacaoNotaResponse> {
    return this.service.notaAvaliacao(filmeId, usuarioId);
  }

  @Post()
  @PreAuthorize([Roles.USER])
  @ApiNoContentResponse({ description: 'Avaliação realizada com sucesso!' })
  async avaliarFilme(@Body() avaliacao: AvaliacaoRequest): Promise<void> {
    await this.service.avaliar(avaliacao);
  }

}