import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { DeleteResult } from 'typeorm';
import { CategoriaRequest } from '../models/request/categoria.request';
import { AutenticacaoGuard } from '../../security/guard/AutenticacaoGuard';
import { RolesGuard } from '../../security/guard/roleGuard';
import { PreAuthorize } from '../../security/guard/decorators/PreAuthorize.decorator';
import { Roles } from '../../role/models/enum/Roles';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { CategoriaResponse } from '../models/response/categoriaResponse';


// @UseGuards(AutenticacaoGuard,RolesGuard)
@Controller('/categorias')
export class CategoriaController {

  constructor(private readonly service: CategoriaService) {
  }

  @Get()
  // @PreAuthorize([Roles.ADMIN])
  // @UseInterceptors(CacheInterceptor) //TODO CACHE REDIS
  listarCategorias(@Query() { page, size, filter }): Promise<PageableResponse<CategoriaResponse>> {
    return this.service.listarTodas(page, size, filter);
  }

  @Get('/:id')
  buscarCategoriasPorId(@Param('id') id: string): Promise<CategoriaResponse>  {
    return this.service.buscarPorId(id);
  }

  @Post()
  criarCategoria(@Body() categoria: CategoriaRequest): Promise<CategoriaResponse>  {
    return this.service.criarCategoria(categoria);
  }

  @Put('/:id')
  alterarCategoria(@Param('id') id: string, @Body() categoria: CategoriaRequest): Promise<CategoriaResponse>  {
    return this.service.atualizarCategoria(id, categoria);
  }

  @Delete('/:id')
  @HttpCode(204)
  deletarCategoria(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarCategoria(id);
  }

}