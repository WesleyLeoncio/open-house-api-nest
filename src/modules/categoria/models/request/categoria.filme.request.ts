import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { CategoriaEnum } from '../enum/categoria.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriaFilmeRequest{
  @IsNotEmpty({ message: 'Id da Categoria deve ser preenchido!' })
  @IsUUID('all', {message: "Id deve ser um UUID"})
  @ApiProperty({
    example: '948f7518-e1ba-4482-bcb6-29c24fa85e3b',
    description: 'O id da categoria deve ser um id valido.'
  })
  id: string

  @IsEnum(CategoriaEnum)
  @ApiProperty({
    example: 'ACAO',
    enum: ['ACAO, AVENTURA, ANIMACAO, COMEDIA, CRIME, DRAMA, DOCUMENTARIO, FANTASIA, FICCAO_CIENTIFICA, TERROR, MUSICAL, ROMANCE, SUSPENSE, GUERRA, WESTERN, BIOGRAFIA, MISTERIO, POLICIAL, ESPORTE, TESTE']
  })
  nome: CategoriaEnum;
}