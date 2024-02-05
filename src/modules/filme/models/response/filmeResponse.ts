import { CategoriaResponse } from '../../../categoria/models/response/CategoriaResponse';

export class FilmeResponse {

  id: string;

  nome: string;

  descricao: string;

  dataLancamento: Date;

  duracao: string;

  imagem: string;

  categorias: CategoriaResponse[];

  constructor(id: string, nome: string, descricao: string, dataLancamento: Date, duracao: string, imagem: string, categorias: CategoriaResponse[]) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.dataLancamento = dataLancamento;
    this.duracao = duracao;
    this.imagem = imagem;
    this.categorias = categorias;
  }
}