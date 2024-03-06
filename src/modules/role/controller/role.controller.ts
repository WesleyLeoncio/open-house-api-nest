import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { RoleRequest } from '../models/request/roleRequest';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { DeleteResult } from 'typeorm';
import { RoleResponse } from '../models/response/roleResponse';
import { PreAuthorize } from '../../security/guard/decorators/PreAuthorize.decorator';
import { Roles } from '../models/enum/Roles';
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
@ApiTags('Endpoints De Roles')
@Controller('/roles')
@ApiBearerAuth('KEY_AUTH')
export class RoleController {

  constructor(private readonly service: RoleService) {
  }


  @Get()
  @PreAuthorize([Roles.MASTER])
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'size', required: false, type: 'number' })
  @ApiQuery({ name: 'filter', required: false, type: 'string' })
  @ApiOkResponse({ type: PageableResponse<RoleResponse> })
  listarRoles(@Query() { page, size, filter }): Promise<PageableResponse<RoleResponse>> {
    return this.service.listarTodas(page, size, filter);
  }

  @Get('/:id')
  @PreAuthorize([Roles.MASTER])
  @ApiOkResponse({ type: RoleResponse })
  buscarRolesPorId(@Param('id') id: string): Promise<RoleResponse> {
    return this.service.buscarPorId(id);
  }

  @Post()
  @PreAuthorize([Roles.MASTER])
  @ApiCreatedResponse({
    description: 'Role Cadastrada com sucesso!',
    type: RoleResponse,
  })
  criarRole(@Body() role: RoleRequest): Promise<RoleResponse> {
    return this.service.criarRole(role);
  }

  @Put('/:id')
  @PreAuthorize([Roles.MASTER])
  @ApiOkResponse({ type: RoleResponse })
  alterarRole(@Param('id') id: string, @Body() role: RoleRequest): Promise<RoleResponse> {
    return this.service.atualizarRole(id, role);
  }

  @Delete('/:id')
  @PreAuthorize([Roles.MASTER])
  @ApiNoContentResponse({ description: 'Removido com sucesso!' })
  deletarRole(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarRole(id);
  }

}