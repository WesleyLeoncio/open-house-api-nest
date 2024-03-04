import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvaliacaoRequest {
  @IsNotEmpty({ message: 'ID do filme deve ser preenchido!' })
  @IsUUID('all', {message: "Id deve ser um UUID"})
  @ApiProperty({
    example: '6919cca6-a9a9-4fd2-bf10-43f74e1c5f10',
    description: 'O id do filme deve ser um UUID'
  })
  idFilme: string;

  @IsNotEmpty({ message: 'ID do usuario deve ser preenchido!' })
  @IsUUID('all', {message: "Id deve ser um UUID"})
  @ApiProperty({
    example: '314739ed-86ef-43e3-a69f-1856bcb550d7',
    description: 'O id do usuario deve ser um UUID'
  })
  idUsuario: string;

  @IsNotEmpty({ message: 'A nota deve ser preenchida!' })
  @IsInt({message: "A nota deve ser um numero inteiro"})
  @Min(1, {message: "Nota minima 1"})
  @Max(5,{message: "Nota máxima 5"})
  @ApiProperty({
    example: 5,
    description: 'A nota do filme deve ser um numero inteiro de 1 a 5'
  })
  nota: number;
}