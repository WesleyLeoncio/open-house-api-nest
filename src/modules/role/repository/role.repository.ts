import { DeleteResult, Repository } from 'typeorm';
import { RoleEntity } from '../models/entity/role.entity';
import { IroleRepository } from './irole.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleRepository implements IroleRepository {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {
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
    findAll(): Promise<RoleEntity[]> {
      return this.repository.find();
    }
    findById(id: string): Promise<RoleEntity> {
      return this.repository.findOne({
        where: { id: id },
      });
    }

}