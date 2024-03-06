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
} from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { DeleteResult } from 'typeorm';
import { CategoriaRequest } from '../models/request/categoria.request';
import { AutenticacaoGuard } from '../../security/guard/AutenticacaoGuard';
import { RolesGuard } from '../../security/guard/roleGuard';
import { PreAuthorize } from '../../security/guard/decorators/PreAuthorize.decorator';
import { Roles } from '../../role/models/enum/Roles';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { CategoriaResponse } from '../models/response/categoriaResponse';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';


@UseGuards(AutenticacaoGuard, RolesGuard)
@ApiTags('Endpoints De Categorias')
@Controller('/categorias')
@ApiBearerAuth('KEY_AUTH')
export class CategoriaController {

  constructor(private readonly service: CategoriaService) {
  }

  @Get()
  @PreAuthorize([Roles.ADMIN])
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'size', required: false, type: 'number' })
  @ApiQuery({ name: 'filter', required: false, type: 'string' })
  @ApiOkResponse({ type: PageableResponse<CategoriaResponse> })
  listarCategorias(@Query() { page, size, filter }): Promise<PageableResponse<CategoriaResponse>> {
    return this.service.listarTodas(page, size, filter);
  }

  @Get('/:id')
  @PreAuthorize([Roles.ADMIN])
  @ApiOkResponse({ type: CategoriaResponse })
  buscarCategoriasPorId(@Param('id') id: string): Promise<CategoriaResponse> {
    return this.service.buscarPorId(id);
  }

  @Post()
  @PreAuthorize([Roles.ADMIN])
  @ApiCreatedResponse({
    description: 'Categoria Cadastrada com sucesso!',
    type: CategoriaResponse,
  })
  criarCategoria(@Body() categoria: CategoriaRequest): Promise<CategoriaResponse> {
    return this.service.criarCategoria(categoria);
  }

  @Put('/:id')
  @PreAuthorize([Roles.ADMIN])
  @ApiOkResponse({ type: CategoriaResponse })
  alterarCategoria(@Param('id') id: string, @Body() categoria: CategoriaRequest): Promise<CategoriaResponse> {
    return this.service.atualizarCategoria(id, categoria);
  }

  @Delete('/:id')
  @PreAuthorize([Roles.ADMIN])
  @ApiNoContentResponse({ description: 'Removido com sucesso!' })
  deletarCategoria(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarCategoria(id);
  }

}