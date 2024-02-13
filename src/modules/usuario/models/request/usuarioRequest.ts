import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty } from 'class-validator';
import { RoleRequest } from '../../../role/models/request/roleRequest';



export class UsuarioRequest { //TODO TRATAR CORRETAMENTE OS VALIDATIONS
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  login: string;

  @IsNotEmpty()
  senha: string;

  @IsArray()
  @ArrayMinSize(1)
  roles: RoleRequest[];
}