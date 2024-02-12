import { RoleRequest } from '../request/roleRequest';
import { RoleEntity } from '../entity/role.entity';
import { RoleResponse } from '../response/roleResponse';

export class MapperRole {

  static roleRequestToRoleEntity(request: RoleRequest): RoleEntity {
    const entity: RoleEntity = new RoleEntity();
    Object.assign(entity, <RoleEntity>request);
    return entity;
  }

  static roleEntityToRoleResponse(entity: RoleEntity): RoleResponse {
    return new RoleResponse(entity.id, entity.nome);
  }

  static roleEntityListToRoleResponseList(entity: RoleEntity[]): RoleResponse[] {
    return entity.map(e => new RoleResponse(e.id, e.nome));
  }
}