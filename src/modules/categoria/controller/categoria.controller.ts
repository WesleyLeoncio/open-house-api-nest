import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriaService } from "../service/categoria.service";
import { CategoriaCreatRequest } from '../models/request/categoriaCreat.request';

@Controller('/categorias')
export class CategoriaController{

  constructor(private readonly service: CategoriaService) {}

  @Get()
  async listarCategorias(){
    return this.service.listarTodasCategorias();
  }

  @Post()
  criarCategoria(@Body() categoria: CategoriaCreatRequest){
    return this.service.criarCategoria(categoria);
  }

}