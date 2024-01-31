import { Injectable } from '@nestjs/common';
import { IroleRepository } from '../repository/irole.repository';
import { RoleRequest } from '../models/request/roleRequest';
import { RoleEntity } from '../models/entity/role.entity';

@Injectable()
export class RoleService {

  constructor(
    private readonly roleRepository: IroleRepository
  ) {
  }

  async createRole(role: RoleRequest){
    const roleEntity = new RoleEntity();
    roleEntity.nome = role.nome;
    return await this.roleRepository.create(roleEntity);
  }



}