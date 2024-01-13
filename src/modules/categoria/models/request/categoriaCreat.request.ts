import { IsNotEmpty } from 'class-validator';

export class CategoriaCreatRequest {
  @IsNotEmpty({ message: 'Nome da Categoria deve ser preenchido!' })
  nome: string;
}