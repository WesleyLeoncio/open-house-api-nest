import { Controller, Get, Post, Query } from '@nestjs/common';
import { AvaliacaoService } from '../service/avaliacao.service';

@Controller('/avaliacoes')
export class AvaliacaoController {

  constructor(private readonly service: AvaliacaoService) {
  }

  @Get()
  async listarAvaliacoes(@Query() { page, size, filter }) {
    return this.service.listarTodos(page, size, filter);
  }

  @Get('/teste')
  async buscarAvaliacao() {
    return this.service.buscarAvaliacao();
  }

  @Post()
  async avaliarFilme(){
    return this.service.criarAvaliacao();
  }

}