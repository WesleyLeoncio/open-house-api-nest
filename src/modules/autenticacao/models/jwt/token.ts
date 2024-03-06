import { ApiProperty } from '@nestjs/swagger';

export abstract class Token {
  @ApiProperty()
  token: string;
}