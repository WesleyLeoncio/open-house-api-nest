import { Controller, Get, Post } from '@nestjs/common';
import { AvaliacaoService } from '../service/avaliacao.service';

@Controller('/avaliacoes')
export class AvaliacaoController {

  constructor(private readonly service: AvaliacaoService) {
  }

  @Get()
  async listarAvaliacoes() {
    return this.service.listarTodos();
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