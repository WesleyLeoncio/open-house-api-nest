import { CategoriaEntity } from '../entity/categoria.entity';
import { CategoriaRequest } from '../request/categoria.request';
import { CategoriaResponse } from '../response/categoriaResponse';

export class MapperCategoria {

  static categoriaRequestToCategoriaEntity(request: CategoriaRequest): CategoriaEntity {
    const entity: CategoriaEntity = new CategoriaEntity();
    Object.assign(entity, <CategoriaEntity>request);
    return entity;
  }

  static categoriaEntityToCategoriaResponse(entity: CategoriaEntity): CategoriaResponse {
    return new CategoriaResponse(entity.id, entity.nome);
  }

  static categoriaEntityListToCategoriaResponseList(entity: CategoriaEntity[]): CategoriaResponse[] {
    return entity.map(e => new CategoriaResponse(e.id, e.nome));
  }

}