import { Injectable } from '@nestjs/common';
import { IusuarioRepository } from '../repository/iusuario.repository';
import { UsuarioEntity } from '../models/entity/usuario.entity';
import { UsuarioRequest } from '../models/request/usuarioRequest';

@Injectable()
export class UsuarioService {

  constructor(
    private readonly usuarioRepository: IusuarioRepository
  ) {
  }

  async createUsuario(usuario: UsuarioRequest){
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.nome = usuario.nome;
    usuarioEntity.login = usuario.login;
    usuarioEntity.senha = usuario.senha;
    usuarioEntity.role = usuario.role;
    return await this.usuarioRepository.create(usuarioEntity);
  }

  async getUsuarios(){
    return await this.usuarioRepository.findAll();
  }
}