import { DeleteResult } from 'typeorm';
import { Pagination } from '../pageable/models/pagination';

export abstract class GenericRepository<T> {
  abstract create(entity: T): Promise<T>;

  abstract update(entity: T): Promise<T>;

  abstract delete(id: string): Promise<DeleteResult>;

  abstract findAll(pagination: Pagination): Promise<[T[], number]>;

  abstract findById(id: string): Promise<T>;
}