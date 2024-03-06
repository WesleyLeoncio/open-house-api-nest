import { ApiProperty } from '@nestjs/swagger';

export class AvaliacaoNotaResponse {
  @ApiProperty({ example: 5 })
  nota: number;

  constructor(nota: number) {
    this.nota = nota;
  }
}