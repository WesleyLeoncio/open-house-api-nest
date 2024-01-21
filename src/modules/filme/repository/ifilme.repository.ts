import { GenericRepository } from '../../utils/repository/generic.repository';
import { FilmeEntity } from '../models/entity/filme.entity';

export abstract class IfilmeRepository extends GenericRepository<FilmeEntity>{}