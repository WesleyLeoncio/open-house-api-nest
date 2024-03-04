import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../enum/Roles';

export class RoleUserRequest {
  @IsNotEmpty({ message: 'Id da role deve ser preenchido!' })
  @IsUUID('all', {message: "Id deve ser um UUID"})
  @ApiProperty({
    example: '26531c0a-fda7-4cf9-a825-26e13b3f6765',
    description: 'O id da role deve ser um id valido.'
  })
  id: string;

  @ApiProperty({
    example: 'ROLE_USER',
    enum: ['ROLE_MASTER, ROLE_ADMIN, ROLE_USER, ROLE_TESTE']
  })
  nome: Roles;


}