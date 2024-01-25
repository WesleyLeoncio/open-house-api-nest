import { IsNotEmpty } from 'class-validator';

export class CategoriaRequest {
  @IsNotEmpty({ message: 'Nome da Categoria deve ser preenchido!' })
  nome: string;
}