import { RoleResponse } from '../../../role/models/response/roleResponse';

export class UsuarioResponse {
  id: string;
  nome: string;
  login: string;
  roles: RoleResponse[];
  status: boolean;


  constructor(id: string, nome: string, login: string, roles: RoleResponse[], status: boolean) {
    this.id = id;
    this.nome = nome;
    this.login = login;
    this.roles = roles;
    this.status = status;
  }
}