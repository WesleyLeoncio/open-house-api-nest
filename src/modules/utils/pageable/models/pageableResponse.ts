import { ApiProperty } from '@nestjs/swagger';

export abstract class PageableResponse<T> {
  @ApiProperty({ description: 'Número total de elementos' })
  totalElements: number;

  @ApiProperty({ type: [Object], description: 'Conteúdo da página' })
  content: T[];

  @ApiProperty({ description: 'Número total de páginas' })
  totalPages: number;

  @ApiProperty({ description: 'Número da página atual' })
  currentPage: number;
}