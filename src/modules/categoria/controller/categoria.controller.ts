import { Controller, Get } from "@nestjs/common";
import { CategoriaService } from "../service/categoria.service";

@Controller('/categorias')
export class CategoriaController{

  constructor(private readonly service: CategoriaService) {}

  @Get()
  listarCategorias(): string {
    return this.service.listarTodasCategorias();
  }
}