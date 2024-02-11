import { Roles } from '../enum/Roles';
import { IsEnum } from 'class-validator';

export class RoleRequest {
  @IsEnum(Roles)
  nome: Roles;
}