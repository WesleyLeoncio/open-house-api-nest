import { UsuarioRequest } from '../request/usuarioRequest';
import { UsuarioEntity } from '../entity/usuario.entity';
import { UsuarioResponse } from '../response/usuarioResponse';
import { MapperRole } from '../../../role/models/mapper/mapperRole';


export class MapperUsuario {
  static usuarioRequestToUsuarioEntity(request: UsuarioRequest): UsuarioEntity{
    const entity: UsuarioEntity = new UsuarioEntity();
    Object.assign(entity, <UsuarioEntity>request);
    return entity;
  }

  static usuarioEntityToUsuarioResponse(entity: UsuarioEntity): UsuarioResponse {
    return new UsuarioResponse(
      entity.id,
      entity.nome,
      entity.login,
      MapperRole.roleEntityListToRoleResponseList(entity.roles),
      entity.status
    );
  }

  static usuarioEntityListToUsuarioResponseList(entity: UsuarioEntity[]): UsuarioResponse[] {
    return entity.map(entity => new UsuarioResponse(
      entity.id,
      entity.nome,
      entity.login,
      MapperRole.roleEntityListToRoleResponseList(entity.roles),
      entity.status
    ));
  }

}