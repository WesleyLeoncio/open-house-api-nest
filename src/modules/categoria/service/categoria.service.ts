import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriaEntity } from '../models/entity/categoria.entity';
import { IcategoriaRepository } from '../repository/icategoria.repository';
import { DeleteResult } from 'typeorm';
import { CategoriaRequest } from '../models/request/categoria.request';
import { MapperCategoria } from '../models/mapper/mapperCategoria';

@Injectable()
export class CategoriaService {

  constructor(
    private readonly categoriaRepository: IcategoriaRepository,
  ) {
  }

  async listarTodasCategorias(): Promise<CategoriaEntity[]> {
    return await this.categoriaRepository.findAll();
  }

  async buscarPorId(id: string) {
    return await this.verificarCategoria(id);
  }

  async atualizarCategoria(id: string, request: CategoriaRequest): Promise<CategoriaEntity> {
    const entity: CategoriaEntity =  await this.verificarCategoria(id);
    Object.assign(entity, <CategoriaEntity>request);
    return await this.categoriaRepository.update(entity);
  }


  async criarCategoria(request: CategoriaRequest): Promise<CategoriaEntity> {
    const entity: CategoriaEntity = MapperCategoria.categoriaRequestToCategoriaEntity(request);
    return await this.categoriaRepository.create(entity);
  }

  async deletarCategoria(id: string): Promise<DeleteResult> {
    await this.verificarCategoria(id);
    return await this.categoriaRepository.delete(id);
  }

  private async verificarCategoria(id: string): Promise<CategoriaEntity>{
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) throw new NotFoundException('Categoria não encontrada!');
    return categoria;
  }

}