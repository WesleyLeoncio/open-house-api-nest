import { Injectable } from '@nestjs/common';
import { IfilmeRepository } from '../repository/ifilme.repository';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { Pageable } from '../../utils/pageable/pageable';
import { MapperFilme } from '../models/mapper/mapperFilme';
import { FilmeResponse } from '../models/response/filmeResponse';

@Injectable()
export class FilmeService {
  constructor(
    private readonly filmeRepository: IfilmeRepository,
  ) {
  }

  async listarTodosFilmes(page: number, size: number, filter: string): Promise<PageableResponse<FilmeResponse>> {
    const pageable: Pageable<FilmeResponse> = new Pageable(page, size, filter);
    const [content, totalElements] = await this.filmeRepository.findAll(pageable.pagination);
    return pageable.getPageableData(totalElements, MapperFilme.filmeEntityListToFilmeResponseList(content));
  }


}