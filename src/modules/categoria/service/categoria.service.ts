import { Injectable } from '@nestjs/common';
import { CategoriaCreatRequest } from '../models/request/categoriaCreat.request';

@Injectable()
export class CategoriaService {

   async listarTodasCategorias() {
    return 'TESTE DE CATEGORIAS!';
  }


  async criarCategoria(categoria: CategoriaCreatRequest) {
    return categoria;
  }

}