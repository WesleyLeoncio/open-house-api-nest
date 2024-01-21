import { Controller, Get } from '@nestjs/common';
import { FilmeService } from '../service/filme.service';

@Controller('/filmes')
export class FilmeController {
  constructor(private readonly service: FilmeService) {
  }

  @Get()
  async listarFilmes() {
    return this.service.listarTodosFilmes();
  }


}