import { Injectable, NotFoundException } from '@nestjs/common';
import { IfilmeRepository } from '../repository/ifilme.repository';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { Pageable } from '../../utils/pageable/pageable';
import { MapperFilme } from '../models/mapper/mapperFilme';
import { FilmeResponse } from '../models/response/filmeResponse';
import { FilmeEntity } from '../models/entity/filme.entity';
import { DeleteResult } from 'typeorm';
import { FilmeRequest } from '../models/request/filme.request';

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

  async buscarPorId(id: string): Promise<FilmeResponse>{
    return MapperFilme.filmeEntityToFilmeResponse(await this.verificarFilme(id));
  }

  async criarFilme(request: FilmeRequest): Promise<FilmeResponse>{
    const entity: FilmeEntity = MapperFilme.filmeRequestToFilmeEntity(request);
    return MapperFilme.filmeEntityToFilmeResponse(await this.filmeRepository.create(entity));
  }

  async atualizarFilme(id: string, request: FilmeRequest): Promise<FilmeResponse>{
    const entity: FilmeEntity = await this.verificarFilme(id);
    Object.assign(entity, <FilmeEntity>request);
    return MapperFilme.filmeEntityToFilmeResponse(await this.filmeRepository.update(entity));
  }

  async deletarFilme(id: string): Promise<DeleteResult>{
    await this.verificarFilme(id);
    return await this.filmeRepository.delete(id);
  }

  private async verificarFilme(id: string): Promise<FilmeEntity>{
    const filme: FilmeEntity = await this.filmeRepository.findById(id);
    if (!filme) throw new NotFoundException('Filme não encontrado!');
    return filme;
  }

}