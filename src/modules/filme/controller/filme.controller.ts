import { Controller, Get, Query } from '@nestjs/common';
import { FilmeService } from '../service/filme.service';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { FilmeResponse } from '../models/response/filmeResponse';

@Controller('/filmes')
export class FilmeController {
  constructor(private readonly service: FilmeService) {
  }

  @Get()
  async listarFilmes(@Query() { page, size, filter }): Promise<PageableResponse<FilmeResponse>> {
    return this.service.listarTodosFilmes(page, size, filter);
  }


}