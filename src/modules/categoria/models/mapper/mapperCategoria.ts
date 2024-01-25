import { CategoriaEntity } from '../entity/categoria.entity';
import { CategoriaRequest } from '../request/categoria.request';

export class MapperCategoria {

  static categoriaRequestToCategoriaEntity(request: CategoriaRequest):CategoriaEntity{
    const entity: CategoriaEntity = new CategoriaEntity();
    Object.assign(entity, <CategoriaEntity>request);
    return entity;
  }

}