import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IusuarioRepository } from './iusuario.repository';
import { UsuarioEntity } from '../models/entity/usuario.entity';

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

  findAll(): Promise<UsuarioEntity[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<UsuarioEntity> {
    return this.repository.findOne({
      where: { id: id },
    });
  }

  findByLogin(login: string): Promise<UsuarioEntity> {
    return this.repository.findOne({
      where: { login: login },
    });
  }

}