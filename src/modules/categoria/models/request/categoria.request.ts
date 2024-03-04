import { IsEnum } from 'class-validator';
import { CategoriaEnum } from '../enum/categoria.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriaRequest {
  @IsEnum(CategoriaEnum)
  @ApiProperty({
    example: 'ACAO',
    enum: ['ACAO, AVENTURA, ANIMACAO, COMEDIA, CRIME, DRAMA, DOCUMENTARIO, FANTASIA, FICCAO_CIENTIFICA, TERROR, MUSICAL, ROMANCE, SUSPENSE, GUERRA, WESTERN, BIOGRAFIA, MISTERIO, POLICIAL, ESPORTE, TESTE']
  })
  nome: CategoriaEnum;
}