import { ApiProperty } from '@nestjs/swagger';

export class RoleResponse {
  @ApiProperty({
    example: 'UUID',
  })
  id: string;

  @ApiProperty()
  @ApiProperty({
    example: 'Nome da Role',
  })
  nome: string;

  constructor(id: string, nome: string) {
    this.id = id;
    this.nome = nome;
  }
}