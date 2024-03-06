import { RoleResponse } from '../../../role/models/response/roleResponse';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponse {
  @ApiProperty({ example: 'UUID' })
  id: string;
  @ApiProperty({ example: 'Nome do usuario' })
  nome: string;
  @ApiProperty({ example: 'email@email.com' })
  login: string;
  @ApiProperty({
    type: () => [RoleResponse],
  })
  roles: RoleResponse[];
  @ApiProperty({ example: true })
  status: boolean;


  constructor(id: string, nome: string, login: string, roles: RoleResponse[], status: boolean) {
    this.id = id;
    this.nome = nome;
    this.login = login;
    this.roles = roles;
    this.status = status;
  }
}