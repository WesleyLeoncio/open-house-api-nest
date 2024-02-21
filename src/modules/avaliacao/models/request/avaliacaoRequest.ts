import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

export class AvaliacaoRequest {
  @IsNotEmpty({ message: 'ID do filme deve ser preenchido!' })
  @IsUUID('all', {message: "Id deve ser um UUID"})
  idFilme: string;

  @IsNotEmpty({ message: 'ID do usuario deve ser preenchido!' })
  @IsUUID('all', {message: "Id deve ser um UUID"})
  idUsuario: string;

  @IsNotEmpty({ message: 'A nota deve ser preenchida!' })
  @IsInt({message: "A nota deve ser um numero inteiro"})
  @Min(1, {message: "Nota minima 1"})
  @Max(5,{message: "Nota máxima 5"})
  nota: number;
}