import { Roles } from '../enum/Roles';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleRequest {
  @IsEnum(Roles)
  @ApiProperty({
    example: 'ROLE_USER',
    enum: ['ROLE_MASTER, ROLE_ADMIN, ROLE_USER, ROLE_TESTE']
  })
  nome: Roles;
}