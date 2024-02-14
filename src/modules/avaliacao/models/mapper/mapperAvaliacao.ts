import { AvaliacaoDeFilmesEntity } from '../entity/avaliacaoDeFilmes.entity';
import { AvaliacaoResponse } from '../response/avaliacaoResponse';
import { MapperFilme } from '../../../filme/models/mapper/mapperFilme';

export class MapperAvaliacao {

  static filmeEntityToFilmeResponse(entity: AvaliacaoDeFilmesEntity): AvaliacaoResponse{
    return new AvaliacaoResponse(
      MapperFilme.filmeEntityToFilmeResponse(entity.filme),
      entity.nota
    );
  }

  static filmeEntityListToFilmeResponseList(entity: AvaliacaoDeFilmesEntity[]): AvaliacaoResponse[]{
    return entity.map(entity => new AvaliacaoResponse(
      MapperFilme.filmeEntityToFilmeResponse(entity.filme),
      entity.nota
    ));
  }
}