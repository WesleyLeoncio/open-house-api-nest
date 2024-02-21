import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { CategoriaEnum } from '../enum/categoria.enum';

export class CategoriaFilmeRequest{
  @IsNotEmpty({ message: 'Id da Categoria deve ser preenchido!' })
  @IsUUID('all', {message: "Id deve ser um UUID"})
  id: string

  @IsEnum(CategoriaEnum)
  nome: CategoriaEnum;
}