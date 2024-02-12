import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { RoleRequest } from '../models/request/roleRequest';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { DeleteResult } from 'typeorm';
import { RoleResponse } from '../models/response/roleResponse';

@Controller('/roles')
export class RoleController {

  constructor(private readonly service: RoleService) {
  }


  @Get()
  // @PreAuthorize([Roles.ADMIN])
  listarRoles(@Query() { page, size, filter }): Promise<PageableResponse<RoleResponse>> {
    return this.service.listarTodas(page, size, filter);
  }

  @Get('/:id')
  buscarRolesPorId(@Param('id') id: string): Promise<RoleResponse> {
    return this.service.buscarPorId(id);
  }

  @Post()
  criarRole(@Body() role: RoleRequest): Promise<RoleResponse> {
    return this.service.criarRole(role);
  }

  @Put('/:id')
  alterarRole(@Param('id') id: string, @Body() role: RoleRequest): Promise<RoleResponse> {
    return this.service.atualizarRole(id, role);
  }

  @Delete('/:id')
  @HttpCode(204)
  deletarRole(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.deletarRole(id);
  }

}