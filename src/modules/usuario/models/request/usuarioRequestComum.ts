import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioRequestComum {
  @IsNotEmpty({message: "Nome do usuario deve ser preenchido!"})
  @ApiProperty({
    example: 'Carlos Magno',
    description: 'O nome não pode ser vazio.'
  })
  nome: string;

  @IsEmail({}, {message: "Esse email não é valido, ex: email@email.com"})
  @ApiProperty({
    example: 'email@email.com',
    description: ' O login deve ser um email valido seguindo o padrão de emails.'
  })
  login: string;

  @IsNotEmpty({message: "A senha deve ser preenchida!"})
  @ApiProperty({
    example: '123456',
    description: 'A senha não pode ser vazia'
  })
  senha: string;


}