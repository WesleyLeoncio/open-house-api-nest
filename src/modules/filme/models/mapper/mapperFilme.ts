import { FilmeEntity } from '../entity/filme.entity';
import { FilmeResponse } from '../response/filmeResponse';

import { MapperCategoria } from '../../../categoria/models/mapper/mapperCategoria';

export class MapperFilme {

  static filmeEntityToFilmeResponse(entity: FilmeEntity): FilmeResponse{
    return new FilmeResponse(
      entity.id,entity.nome, entity.descricao,entity.dataLancamento, entity.duracao,entity.imagem,
      MapperCategoria.categoriaEntityListToCategoriaResponseList(entity.categorias),
    );
  }

  static filmeEntityListToFilmeResponseList(entity: FilmeEntity[]): FilmeResponse[]{
    return entity.map(f => new FilmeResponse(
      f.id,f.nome, f. descricao, f.dataLancamento, f.duracao, f.imagem,
      MapperCategoria.categoriaEntityListToCategoriaResponseList(f.categorias),
    ));
  }
}