import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsuarioRequestComum {
  @IsNotEmpty({message: "Nome do usuario deve ser preenchido!"})
  nome: string;

  @IsEmail({}, {message: "Esse email não é valido, ex: email@email.com"})
  login: string;

  @IsNotEmpty({message: "A senha deve ser preenchida!"})
  senha: string;


}