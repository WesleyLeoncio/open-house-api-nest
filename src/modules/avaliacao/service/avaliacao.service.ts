import { Injectable } from '@nestjs/common';
import { IavaliacaoRepository } from '../repository/iavaliacao.repository';
import { AvaliacaoDeFilmesEntity } from '../models/entity/avaliacaoDeFilmes.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    private readonly avaliacaoRepository: IavaliacaoRepository,
  ) {}

  async listarTodos(): Promise<AvaliacaoDeFilmesEntity[]> {
    return await this.avaliacaoRepository.findAll();
  }

  async criarAvaliacao(): Promise<AvaliacaoDeFilmesEntity> {
    const avaliacao = new AvaliacaoDeFilmesEntity();
    avaliacao.filmeId = '5974bd89-5ba7-4e1b-998a-8cded889066a';
    avaliacao.usuarioId = '7d1e017d-dac8-4dba-b380-6b0b9cd84def'
    avaliacao.nota = 5;
    return await this.avaliacaoRepository.create(avaliacao);
  }

  async buscarAvaliacao(){
    return await this.avaliacaoRepository.findById('7d1e017d-dac8-4dba-b380-6b0b9cd84def')
  }
}