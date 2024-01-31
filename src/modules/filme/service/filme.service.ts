import { Injectable } from '@nestjs/common';
import { IfilmeRepository } from '../repository/ifilme.repository';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { FilmeEntity } from '../models/entity/filme.entity';
import { Pageable } from '../../utils/pageable/pageable';

@Injectable()
export class FilmeService {
  constructor(
    private readonly filmeRepository: IfilmeRepository,
  ) {
  }

  async listarTodosFilmes(page: number, size: number, filter: string): Promise<PageableResponse<FilmeEntity>> {
    const pageable: Pageable<FilmeEntity> = new Pageable(page, size, filter);
    const [content, totalElements] = await this.filmeRepository.findAll(pageable.pagination);
    return pageable.getPageableData(totalElements, content);
  }


}