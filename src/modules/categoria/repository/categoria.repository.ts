import { CategoriaEntity } from '../models/entity/categoria.entity';
import { IcategoriaRepository } from './icategoria.repository';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriaRepository implements IcategoriaRepository {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly repository: Repository<CategoriaEntity>,
  ) {
  }

  update(categoriaEntity: CategoriaEntity): Promise<CategoriaEntity> {
       return this.repository.save(categoriaEntity);
  }

  create(categoriaEntity: CategoriaEntity): Promise<CategoriaEntity> {
    return this.repository.save(categoriaEntity);
  }

  findAll(): Promise<CategoriaEntity[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<CategoriaEntity> {
    return this.repository.findOne({
      where: { id: id },
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}