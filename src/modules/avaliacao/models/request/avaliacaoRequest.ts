import { IsNotEmpty } from 'class-validator';

export class AvaliacaoRequest {
  @IsNotEmpty({ message: 'ID do filme deve ser preenchido!' })
  idFilme: string;

  @IsNotEmpty({ message: 'ID do usuario deve ser preenchido!' })
  idUsuario: string;

  @IsNotEmpty({ message: 'A nota deve ser preenchida!' })
  nota: number;
}