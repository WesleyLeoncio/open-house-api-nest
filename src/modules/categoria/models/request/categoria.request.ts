import { IsEnum } from 'class-validator';
import { CategoriaEnum } from '../enum/categoria.enum';

export class CategoriaRequest {
  @IsEnum(CategoriaEnum)
  nome: CategoriaEnum;
}