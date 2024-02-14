import { Injectable } from '@nestjs/common';
import { IavaliacaoRepository } from '../repository/iavaliacao.repository';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { Pageable } from '../../utils/pageable/pageable';
import { AvaliacaoResponse } from '../models/response/avaliacaoResponse';
import { MapperAvaliacao } from '../models/mapper/mapperAvaliacao';
import { AvaliacaoRequest } from '../models/request/avaliacaoRequest';
import { FilmeService } from '../../filme/service/filme.service';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { AvaliacaoDeFilmesEntity } from '../models/entity/avaliacaoDeFilmes.entity';
import { FilmeEntity } from '../../filme/models/entity/filme.entity';
import { UsuarioEntity } from '../../usuario/models/entity/usuario.entity';
import { AvaliacaoNotaResponse } from '../models/response/avaliacaoNotaResponse';

@Injectable()
export class AvaliacaoService {
  constructor(
    private readonly avaliacaoRepository: IavaliacaoRepository,
    private readonly filmeService: FilmeService,
    private readonly usuarioService: UsuarioService,
  ) {
  }

  async listarTodos(page: number, size: number, filter: string): Promise<PageableResponse<AvaliacaoResponse>> {
    const pageable: Pageable<AvaliacaoResponse> = new Pageable(page, size, filter);
    const [content, totalElements] = await this.avaliacaoRepository.findAll(pageable.pagination);
    return pageable.getPageableData(totalElements, MapperAvaliacao.filmeEntityListToFilmeResponseList(content));
  }

  async listarTodosPorUsuario(usuarioId: string, page: number, size: number, filter: string): Promise<PageableResponse<AvaliacaoResponse>> {
    const pageable: Pageable<AvaliacaoResponse> = new Pageable(page, size, filter);
    const [content, totalElements] = await this.avaliacaoRepository.findByUsuarioId(usuarioId, pageable.pagination);
    return pageable.getPageableData(totalElements, MapperAvaliacao.filmeEntityListToFilmeResponseList(content));
  }

  async avaliar(request: AvaliacaoRequest): Promise<void> {
    const filme: FilmeEntity = await this.filmeService.verificarFilme(request.idFilme);
    const usuario: UsuarioEntity = await this.usuarioService.verificarUsuario(request.idUsuario);
    const avaliacao: AvaliacaoDeFilmesEntity = new AvaliacaoDeFilmesEntity();

    avaliacao.usuario = usuario;
    avaliacao.filme = filme;
    avaliacao.nota = request.nota;

    await this.avaliacaoRepository.avaliar(avaliacao);
  }

  async notaAvaliacao(filmeId: string, usuarioId: string): Promise<AvaliacaoNotaResponse> {
    const avaliacao: AvaliacaoDeFilmesEntity = await this.avaliacaoRepository.findByIds(filmeId, usuarioId);
    return new AvaliacaoNotaResponse(avaliacao.nota);
  }

}