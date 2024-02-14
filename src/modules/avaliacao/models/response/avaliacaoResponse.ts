import { FilmeResponse } from '../../../filme/models/response/filmeResponse';

export class AvaliacaoResponse{
  filme: FilmeResponse;
  nota: number;


  constructor(filme: FilmeResponse, nota: number) {
    this.filme = filme;
    this.nota = nota;
  }
}