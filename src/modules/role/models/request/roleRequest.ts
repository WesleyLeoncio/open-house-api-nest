import { Roles } from '../enum/Roles';
import { IsNotEmpty } from 'class-validator';

export class RoleRequest {
  @IsNotEmpty()
  nome: Roles;
}