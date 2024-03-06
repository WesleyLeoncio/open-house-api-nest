import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriaEntity } from '../models/entity/categoria.entity';
import { IcategoriaRepository } from '../repository/icategoria.repository';
import { DeleteResult } from 'typeorm';
import { CategoriaRequest } from '../models/request/categoria.request';
import { MapperCategoria } from '../models/mapper/mapperCategoria';
import { Pageable } from '../../utils/pageable/pageable';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { CategoriaResponse } from '../models/response/categoriaResponse';

@Injectable()
export class CategoriaService {

  constructor(
    private readonly categoriaRepository: IcategoriaRepository,
  ) {
  }

  async listarTodas(page: number, size: number, filter: string): Promise<PageableResponse<CategoriaResponse>> {
    const pageable: Pageable<CategoriaResponse> = new Pageable(page, size, filter);
    const [content, totalElements] = await this.categoriaRepository.findAll(pageable.pagination);
    return pageable.getPageableData(totalElements, MapperCategoria.categoriaEntityListToCategoriaResponseList(content));
  }

  async buscarPorId(id: string): Promise<CategoriaResponse> {
    return MapperCategoria.categoriaEntityToCategoriaResponse(await this.verificarCategoria(id));
  }

  async atualizarCategoria(id: string, request: CategoriaRequest): Promise<CategoriaResponse> {
    const entity: CategoriaEntity = await this.verificarCategoria(id);
    Object.assign(entity, <CategoriaEntity>request);
    return MapperCategoria.categoriaEntityToCategoriaResponse(
      await this.categoriaRepository.update(entity));
  }


  async criarCategoria(request: CategoriaRequest): Promise<CategoriaResponse> {
    const entity: CategoriaEntity = MapperCategoria.categoriaRequestToCategoriaEntity(request);
    return MapperCategoria.categoriaEntityToCategoriaResponse(await this.categoriaRepository.create(entity));
  }

  async deletarCategoria(id: string): Promise<DeleteResult> {
    await this.verificarCategoria(id);
    return await this.categoriaRepository.delete(id);
  }

  private async verificarCategoria(id: string): Promise<CategoriaEntity> {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) throw new NotFoundException('Categoria não encontrada!');
    return categoria;
  }

}