import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilmeService } from '../service/filme.service';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { FilmeResponse } from '../models/response/filmeResponse';
import { DeleteResult } from 'typeorm';
import { FilmeRequest } from '../models/request/filme.request';
import { PreAuthorize } from '../../security/guard/decorators/PreAuthorize.decorator';
import { Roles } from '../../role/models/enum/Roles';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AutenticacaoGuard } from '../../security/guard/AutenticacaoGuard';
import { RolesGuard } from '../../security/guard/roleGuard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(AutenticacaoGuard, RolesGuard)
@ApiTags('Endpoints De Filmes')
@Controller('/filmes')
@ApiBearerAuth('KEY_AUTH')
export class FilmeController {
  constructor(private readonly service: FilmeService) {
  }

  @Get()
  @PreAuthorize([Roles.USER])
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'size', required: false, type: 'number' })
  @ApiQuery({ name: 'filter', required: false, type: 'string' })
  @ApiOkResponse({ type: PageableResponse<FilmeResponse> })
  async listarFilmes(@Query() { page, size, filter }): Promise<PageableResponse<FilmeResponse>> {
    return this.service.listarTodosFilmes(page, size, filter);
  }

  @Get('/:id')
  @PreAuthorize([Roles.USER])
  @ApiOkResponse({ type: FilmeResponse })
  buscarFilmePorId(@Param('id') id: string): Promise<FilmeResponse> {
    return this.service.buscarPorId(id);
  }

  @Post()
  @PreAuthorize([Roles.ADMIN])
  @ApiCreatedResponse({
    description: 'Filme Cadastrada com sucesso!',
    type: FilmeResponse,
  })
  criarFilme(@Body() filme: FilmeRequest): Promise<FilmeResponse> {
    return this.service.criarFilme(filme);
  }

  @Put('/:id')
  @PreAuthorize([Roles.ADMIN])
  @ApiOkResponse({ type: FilmeResponse })
  alterarFilme(@Param('id') id: string, @Body() filme: FilmeRequest): Promise<FilmeResponse> {
    return this.service.atualizarFilme(id, filme);
  }

  @Delete('/:id')
  @PreAuthorize([Roles.ADMIN])
  @ApiNoContentResponse({ description: 'Removido com sucesso!' })
  deletarFilme(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarFilme(id);
  }

}