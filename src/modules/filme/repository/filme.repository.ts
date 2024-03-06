import { DeleteResult, Like, Repository } from 'typeorm';
import { FilmeEntity } from '../models/entity/filme.entity';
import { IfilmeRepository } from './ifilme.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../utils/pageable/models/pagination';

@Injectable()
export class FilmeRepository implements IfilmeRepository {

  constructor(
    @InjectRepository(FilmeEntity)
    private readonly repository: Repository<FilmeEntity>,
  ) {
  }

  create(entity: FilmeEntity): Promise<FilmeEntity> {
    return this.repository.save(entity);
  }

  update(entity: FilmeEntity): Promise<FilmeEntity> {
    return this.repository.save(entity);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  findAll(pagination: Pagination): Promise<[FilmeEntity[], number]> {
    return this.repository.findAndCount({
      where: { 'nome': Like('%' + pagination.filter + '%') },
      take: pagination.take,
      skip: pagination.skip,
      relations: {
        categorias: true,
      },
    });
  }

  findById(id: string): Promise<FilmeEntity> {
    return this.repository.findOne({
      relations: {
        categorias: true,
      },
      where: {
        id: id,
      },
    });
  }

}