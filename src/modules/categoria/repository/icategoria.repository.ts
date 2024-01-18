import { CategoriaEntity } from '../models/entity/categoria.entity';
import { DeleteResult } from 'typeorm';

export abstract class IcategoriaRepository {
  abstract create (categoriaEntity: CategoriaEntity): Promise<CategoriaEntity>;
  abstract update(categoriaEntity: CategoriaEntity): Promise<CategoriaEntity>;
  abstract delete(id: string): Promise<DeleteResult>;
  abstract findAll():Promise<CategoriaEntity[]>;
  abstract findById(id: string):Promise<CategoriaEntity>;
}