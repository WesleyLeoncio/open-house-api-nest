
import { AvaliacaoDeFilmesEntity } from '../models/entity/avaliacaoDeFilmes.entity';
import { Pagination } from '../../utils/pageable/models/pagination';

export abstract class IavaliacaoRepository{
  abstract findByIds(filmeId: string,usuarioId: string):Promise<AvaliacaoDeFilmesEntity>;
  abstract avaliar(entity: AvaliacaoDeFilmesEntity): Promise<AvaliacaoDeFilmesEntity>;
  abstract findAll(pagination: Pagination):Promise<[AvaliacaoDeFilmesEntity[], number]>;
  abstract findByUsuarioId(usuarioId: string, pagination: Pagination): Promise<[AvaliacaoDeFilmesEntity[], number]>;
}