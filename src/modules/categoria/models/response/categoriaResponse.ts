import { ApiProperty } from '@nestjs/swagger';

export class CategoriaResponse {
  @ApiProperty({
    example: 'UUID',
  })
  id: string;

  @ApiProperty({
    example: 'Nome da categoria',
  })
  nome: string;

  constructor(id: string, nome: string) {
    this.id = id;
    this.nome = nome;
  }
}