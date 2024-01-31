import { CategoriaEntity } from '../models/entity/categoria.entity';
import { IcategoriaRepository } from './icategoria.repository';
import { DeleteResult, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Pagination } from '../../utils/pageable/models/pagination';

@Injectable()
export class CategoriaRepository implements IcategoriaRepository {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly repository: Repository<CategoriaEntity>,
  ) {
  }

  update(entity: CategoriaEntity): Promise<CategoriaEntity> {
    return this.repository.save(entity);
  }

  create(entity: CategoriaEntity): Promise<CategoriaEntity> {
    return this.repository.save(entity);
  }

  findAll(pagination: Pagination): Promise<[CategoriaEntity[], number]> {
    return this.repository.findAndCount(
      {
        where: { 'nome': Like('%' + pagination.filter + '%') },
        take: pagination.take,
        skip: pagination.skip,
      },
    );
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