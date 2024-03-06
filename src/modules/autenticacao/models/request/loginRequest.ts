import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @ApiProperty({
    example: 'email@email.com',
    description: ' O login deve ser um email valido seguindo o padrão de emails.',
  })
  login: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @ApiProperty({
    example: '123456',
    description: 'A senha não pode ser vazia',
  })
  senha: string;
}