import { DeleteResult, Repository } from 'typeorm';
import { RoleEntity } from '../models/entity/role.entity';
import { IroleRepository } from './irole.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../utils/pageable/models/pagination';

@Injectable()
export class RoleRepository implements IroleRepository {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {
  }

  findByRole(nome: string): Promise<RoleEntity> {
    return this.repository.findOne({
      where: { nome: nome },
    });
  }

  create(entity: RoleEntity): Promise<RoleEntity> {
    return this.repository.save(entity);
  }

  update(entity: RoleEntity): Promise<RoleEntity> {
    return this.repository.save(entity);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  findAll(pagination: Pagination): Promise<[RoleEntity[], number]> {
    return this.repository.findAndCount(
      {
        take: pagination.take,
        skip: pagination.skip,
      },
    );
  }

  findById(id: string): Promise<RoleEntity> {
    return this.repository.findOne({
      where: { id: id },
    });
  }

}