import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty} from 'class-validator';
import { RoleRequest } from '../../../role/models/request/roleRequest';



export class UsuarioRequest {
  @IsNotEmpty({message: "Nome do usuario deve ser preenchido!"})
  nome: string;

  @IsEmail({}, {message: "Esse email não é valido, ex: email@email.com"})
  login: string;

  @IsNotEmpty({message: "A senha deve ser preenchida!"})
  senha: string;

  @IsArray()
  @ArrayMinSize(1, {message: "Usuario deve ter no minimo uma role"})
  roles: RoleRequest[];
}