import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  login: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  senha: string;
}