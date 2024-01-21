import { Injectable } from '@nestjs/common';
import { IavaliacaoRepository } from './iavaliacao.repository';
import { AvaliacaoDeFilmesEntity } from '../models/entity/avaliacaoDeFilmes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';


@Injectable()
export class AvaliacaoRepository implements IavaliacaoRepository {

  constructor(
    @InjectRepository(AvaliacaoDeFilmesEntity)
    private readonly repository: Repository<AvaliacaoDeFilmesEntity>,
  ) {
  }

  create(entity: AvaliacaoDeFilmesEntity): Promise<AvaliacaoDeFilmesEntity> {
    return this.repository.save(entity);
  }

  update(entity: AvaliacaoDeFilmesEntity): Promise<AvaliacaoDeFilmesEntity> {
    return this.repository.save(entity);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  findAll(): Promise<AvaliacaoDeFilmesEntity[]> {
    return this.repository.find({
      relations: {
        usuario:true,
        filme: true
      }
    });
  }

  //TODO REFATORAR ESTÁ ERRADO
  findById(id: string): Promise<AvaliacaoDeFilmesEntity> {
    console.log(id)
    return this.repository.findOne({
      relations: {
        usuario:true,
        filme: true
      },
      where: {
        usuarioId: '7d1e017d-dac8-4dba-b380-6b0b9cd84def',
        filmeId: '5974bd89-5ba7-4e1b-998a-8cded889066a'
      }
    });
  }


}