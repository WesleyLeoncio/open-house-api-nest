import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoriaService {

  listarTodasCategorias(): string {
    return "TESTE DE CATEGORIAS!";
  }
}