import { Injectable } from '@nestjs/common';
import { IavaliacaoRepository } from './iavaliacao.repository';
import { AvaliacaoDeFilmesEntity } from '../models/entity/avaliacaoDeFilmes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../utils/pageable/models/pagination';
import { Repository } from 'typeorm';


@Injectable()
export class AvaliacaoRepository implements IavaliacaoRepository {

  constructor(
    @InjectRepository(AvaliacaoDeFilmesEntity)
    private readonly repository: Repository<AvaliacaoDeFilmesEntity>,
  ) {
  }

  findByIds(filmeId: string, usuarioId: string): Promise<AvaliacaoDeFilmesEntity> {
    return this.repository.findOne({
      where: {
        usuarioId: usuarioId,
        filmeId: filmeId,
      },
    });
  }

  avaliar(entity: AvaliacaoDeFilmesEntity): Promise<AvaliacaoDeFilmesEntity> {
    return this.repository.save(entity);
  }

  findAll(pagination: Pagination): Promise<[AvaliacaoDeFilmesEntity[], number]> {
    return this.repository.findAndCount(
      {
        take: pagination.take,
        skip: pagination.skip,
        relations: [
          'filme', 'filme.categorias',
        ],
      },
    );
  }

  findByUsuarioId(usuarioId: string, pagination: Pagination): Promise<[AvaliacaoDeFilmesEntity[], number]> {
    return this.repository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      relations: [
        'filme', 'filme.categorias',
      ],
      where: {
        usuarioId: usuarioId,
      },
    });
  }


}