import { UsuarioRequest } from '../request/usuarioRequest';
import { UsuarioEntity } from '../entity/usuario.entity';


export class MapperUsuario {
  static usuarioRequestToUsuarioEntity(request: UsuarioRequest): UsuarioEntity{
    const entity: UsuarioEntity = new UsuarioEntity();
    Object.assign(entity, <UsuarioEntity>request);
    return entity;
  }

}