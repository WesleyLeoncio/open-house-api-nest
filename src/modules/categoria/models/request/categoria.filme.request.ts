import { IsEnum, IsNotEmpty } from 'class-validator';
import { CategoriaEnum } from '../enum/categoria.enum';

export class CategoriaFilmeRequest{
  @IsNotEmpty({ message: 'Id da Categoria deve ser preenchido!' })
  id: string

  @IsEnum(CategoriaEnum)
  nome: CategoriaEnum;
}