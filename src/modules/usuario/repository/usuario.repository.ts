import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { IusuarioRepository } from './iusuario.repository';
import { UsuarioEntity } from '../models/entity/usuario.entity';
import { Pagination } from '../../utils/pageable/models/pagination';

@Injectable()
export class UsuarioRepository implements IusuarioRepository {

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly repository: Repository<UsuarioEntity>,
  ) {
  }

  create(entity: UsuarioEntity): Promise<UsuarioEntity> {
    return this.repository.save(entity);
  }

  update(entity: UsuarioEntity): Promise<UsuarioEntity> {
    return this.repository.save(entity);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async findAll(pagination: Pagination): Promise<[UsuarioEntity[], number]> {
    return await this.repository.findAndCount(
      {
        where: {'nome': Like('%' + pagination.filter + '%')},
        take: pagination.take,
        skip: pagination.skip,
        relations: {
          roles: true,
        },
      }
    )
  }

  findById(id: string): Promise<UsuarioEntity> {
    return this.repository.findOne({
      relations: {
        roles: true,
      },
      where: { id: id },
    });
  }

  findByLogin(login: string): Promise<UsuarioEntity> {
    return this.repository.findOne({
      where: { login: login },
    });
  }

}