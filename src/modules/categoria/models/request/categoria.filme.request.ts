import { IsNotEmpty } from 'class-validator';

export class CategoriaFilmeRequest{
  @IsNotEmpty({ message: 'Id da Categoria deve ser preenchido!' })
  id: string

  @IsNotEmpty({ message: 'Nome da Categoria deve ser preenchido!' })
  nome: string;
}