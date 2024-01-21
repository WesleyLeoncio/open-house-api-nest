import { RoleEntity } from '../../../role/models/entity/role.entity';
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty } from 'class-validator';



export class UsuarioRequest {
  @IsNotEmpty()
  nome: string;
  @IsEmail()
  login: string;
  @IsNotEmpty()
  senha: string;
  @IsArray()
  @ArrayMinSize(1)
  role: RoleEntity[];
}