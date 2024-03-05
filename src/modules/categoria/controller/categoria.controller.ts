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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';


@UseGuards(AutenticacaoGuard,RolesGuard)
@ApiTags('Endpoints De Categorias')
@Controller('/categorias')
@ApiBearerAuth('KEY_AUTH')
export class CategoriaController {

  constructor(private readonly service: CategoriaService) {
  }

  @Get()
  @PreAuthorize([Roles.ADMIN])
  @ApiQuery({ name: 'page', required: false, type: 'number'})
  @ApiQuery({ name: 'size', required: false, type: 'number' })
  @ApiQuery({ name: 'filter', required: false, type: 'string' })
  listarCategorias(@Query() { page, size, filter }): Promise<PageableResponse<CategoriaResponse>> {
    return this.service.listarTodas(page, size, filter);
  }

  @Get('/:id')
  @PreAuthorize([Roles.ADMIN])
  buscarCategoriasPorId(@Param('id') id: string): Promise<CategoriaResponse>  {
    return this.service.buscarPorId(id);
  }

  @Post()
  @PreAuthorize([Roles.ADMIN])
  criarCategoria(@Body() categoria: CategoriaRequest): Promise<CategoriaResponse>  {
    return this.service.criarCategoria(categoria);
  }

  @Put('/:id')
  @PreAuthorize([Roles.ADMIN])
  alterarCategoria(@Param('id') id: string, @Body() categoria: CategoriaRequest): Promise<CategoriaResponse>  {
    return this.service.atualizarCategoria(id, categoria);
  }

  @Delete('/:id')
  @PreAuthorize([Roles.ADMIN])
  @HttpCode(204)
  deletarCategoria(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarCategoria(id);
  }

}