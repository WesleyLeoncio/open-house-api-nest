import { IsNotEmpty } from 'class-validator';
import { CategoriaFilmeRequest } from '../../../categoria/models/request/categoria.filme.request';

export class FilmeRequest {
  @IsNotEmpty({ message: 'Nome do Filme deve ser preenchido!' })
  nome: string;

  @IsNotEmpty({ message: 'Descrição do Filme deve ser preenchido!' })
  descricao: string;

  @IsNotEmpty({ message: 'Data do Filme deve ser preenchido!' })
  dataLancamento: Date;

  @IsNotEmpty({ message: 'Duração do Filme deve ser preenchido!' })
  duracao: string;

  @IsNotEmpty({ message: 'Imagem do Filme deve ser preenchido!' })
  imagem: string;

  @IsNotEmpty({ message: 'Categorias do Filme deve ser preenchido!' })
  categorias: CategoriaFilmeRequest[];
}