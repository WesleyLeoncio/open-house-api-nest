import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from 'class-validator';
import { CategoriaFilmeRequest } from '../../../categoria/models/request/categoria.filme.request';


export class FilmeRequest {
  @IsNotEmpty({ message: 'Nome do Filme deve ser preenchido!' })
  nome: string;

  @IsNotEmpty({ message: 'Descrição do Filme deve ser preenchido!' })
  descricao: string;

  @IsNotEmpty({ message: 'Data do Filme deve ser preenchido!' })
  @IsDateString({}, { message: 'A data de lançamento deve ser uma data valida!' })
  dataLancamento: Date;

  @IsNotEmpty({ message: 'Duração do Filme deve ser preenchido!' })
  duracao: string;

  @IsNotEmpty({ message: 'Imagem do Filme deve ser preenchido!' })
  imagem: string;

  @IsArray()
  @ArrayMinSize(1, {message: "O Filme deve ter no minimo uma categoria"})
  categorias: CategoriaFilmeRequest[];
}