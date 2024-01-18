import { Injectable } from '@nestjs/common';
import { CategoriaEntity } from '../models/entity/categoria.entity';
import { IcategoriaRepository } from '../repository/icategoria.repository';
import { CategoriaCreatRequest } from '../models/request/categoriaCreat.request';
import { DeleteResult } from 'typeorm';

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
    return await this.categoriaRepository.findById(id);
  }

  async atualizarCategoria(id: string, categoriaRequest: CategoriaCreatRequest): Promise<CategoriaEntity> {
    const categoriaEntity: CategoriaEntity = await this.categoriaRepository.findById(id);
    Object.assign(categoriaEntity, categoriaRequest);
    return await this.categoriaRepository.update(categoriaEntity);
  }


  async criarCategoria(categoria: CategoriaCreatRequest): Promise<CategoriaEntity> {
    const categoriaEntity: CategoriaEntity = new CategoriaEntity();
    categoriaEntity.nome = categoria.nome;
    return await this.categoriaRepository.create(categoriaEntity);
  }

  async deletarCategoria(id: string): Promise<DeleteResult> {
    return this.categoriaRepository.delete(id);
  }

}