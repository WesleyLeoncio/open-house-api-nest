import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsuarioRequestComum { //TODO TRATAR CORRETAMENTE OS VALIDATIONS
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  login: string;

  @IsNotEmpty()
  senha: string;


}