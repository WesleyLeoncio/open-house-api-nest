import { CategoriaResponse } from '../../../categoria/models/response/categoriaResponse';
import { ApiProperty } from '@nestjs/swagger';

export class FilmeResponse {
  @ApiProperty({ example: 'UUID' })
  id: string;

  @ApiProperty({ example: 'Nome do Filme' })
  nome: string;

  @ApiProperty({ example: 'Descrição do Filme' })
  descricao: string;

  @ApiProperty({ example: '2024-02-21' })
  dataLancamento: Date;

  @ApiProperty({ example: '1h 20m' })
  duracao: string;

  @ApiProperty({ example: 'imagem.png' })
  imagem: string;

  @ApiProperty({
    type: () => [CategoriaResponse],
  })
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