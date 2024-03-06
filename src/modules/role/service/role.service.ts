import { Injectable, NotFoundException } from '@nestjs/common';
import { IroleRepository } from '../repository/irole.repository';
import { RoleRequest } from '../models/request/roleRequest';
import { RoleEntity } from '../models/entity/role.entity';
import { DeleteResult } from 'typeorm';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { Pageable } from '../../utils/pageable/pageable';
import { RoleResponse } from '../models/response/roleResponse';
import { MapperRole } from '../models/mapper/mapperRole';

@Injectable()
export class RoleService {

  constructor(
    private readonly roleRepository: IroleRepository,
  ) {
  }

  async criarRole(request: RoleRequest): Promise<RoleResponse> {
    const entity: RoleEntity = MapperRole.roleRequestToRoleEntity(request);
    return MapperRole.roleEntityToRoleResponse(await this.roleRepository.create(entity));
  }

  async listarTodas(page: number, size: number, filter: string): Promise<PageableResponse<RoleResponse>> {
    const pageable: Pageable<RoleResponse> = new Pageable(page, size, filter);
    const [content, totalElements] = await this.roleRepository.findAll(pageable.pagination);
    return pageable.getPageableData(totalElements, MapperRole.roleEntityListToRoleResponseList(content));
  }

  async buscarPorId(id: string): Promise<RoleResponse> {
    return MapperRole.roleEntityToRoleResponse(await this.verificarRole(id));
  }

  async atualizarRole(id: string, request: RoleRequest): Promise<RoleResponse> {
    const entity: RoleEntity = await this.verificarRole(id);
    Object.assign(entity, <RoleEntity>request);
    return MapperRole.roleEntityToRoleResponse(
      await this.roleRepository.update(entity));
  }

  async deletarRole(id: string): Promise<DeleteResult> {
    await this.verificarRole(id);
    return await this.roleRepository.delete(id);
  }

  private async verificarRole(id: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findById(id);
    if (!role) throw new NotFoundException('Role não encontrada!');
    return role;
  }

  async buscarRolePeloNome(nome: string): Promise<RoleEntity> {
    const role: RoleEntity = await this.roleRepository.findByRole(nome);
    if (!role) throw new NotFoundException('Essa role não existe!');
    return role;
  }
}