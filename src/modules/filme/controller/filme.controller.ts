import { Controller, Get, Query } from '@nestjs/common';
import { FilmeService } from '../service/filme.service';

@Controller('/filmes')
export class FilmeController {
  constructor(private readonly service: FilmeService) {
  }

  @Get()
  async listarFilmes(@Query() { page, size, filter }) {
    return this.service.listarTodosFilmes(page, size, filter);
  }


}