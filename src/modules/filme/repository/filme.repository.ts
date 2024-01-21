import { DeleteResult, Repository } from 'typeorm';
import { FilmeEntity } from '../models/entity/filme.entity';
import { IfilmeRepository } from './ifilme.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

  findAll(): Promise<FilmeEntity[]> {
    return this.repository.find({
      relations: {
        categoria: true,
      },
    });
  }

  findById(id: string): Promise<FilmeEntity> {
    return this.repository.findOne({
      relations: {
        categoria: true,
      },
      where: {
        id: id,
      },
    });
  }

}