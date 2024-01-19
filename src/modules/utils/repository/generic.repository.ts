import { DeleteResult } from 'typeorm';

export abstract class GenericRepository<T> {
  abstract create (entity: T): Promise<T>;
  abstract update(entity: T): Promise<T>;
  abstract delete(id: string): Promise<DeleteResult>;
  abstract findAll():Promise<T[]>;
  abstract findById(id: string):Promise<T>;
}