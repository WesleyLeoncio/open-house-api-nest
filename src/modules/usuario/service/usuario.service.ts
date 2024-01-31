import { Injectable, NotFoundException } from '@nestjs/common';
import { IusuarioRepository } from '../repository/iusuario.repository';
import { UsuarioEntity } from '../models/entity/usuario.entity';
import { UsuarioRequest } from '../models/request/usuarioRequest';
import { MapperUsuario } from '../models/mapper/mapperUsuario';
import { Bcrypt } from '../../security/bcrypt';
import { Pageable } from '../../utils/pageable/pageable';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';

@Injectable()
export class UsuarioService {

  constructor(
    private readonly usuarioRepository: IusuarioRepository
  ) {
  }

  async createUsuario(request: UsuarioRequest){
    request.senha = await Bcrypt.passwordHash(request.senha);
    const entity: UsuarioEntity = MapperUsuario.usuarioRequestToUsuarioEntity(request);
    return await this.usuarioRepository.create(entity);
  }

  async getUsuarios(page: number, size: number, filter: string):Promise<PageableResponse<UsuarioEntity>>{
    const pageable: Pageable<UsuarioEntity> = new Pageable(page, size, filter);
    const [content, totalElements] = await this.usuarioRepository.findAll(pageable.pagination);
    return pageable.getPageableData(totalElements, content);
  }

  async verificarLogin(login: string):Promise<UsuarioEntity>{
    const usuario: UsuarioEntity = await this.usuarioRepository.findByLogin(login);
    if (!usuario) throw new NotFoundException('Usuário Incorreto!');
    return usuario;
  }

  async verificarUsuarioById(id: string):Promise<UsuarioEntity>{
    const usuario: UsuarioEntity = await this.usuarioRepository.findById(id);
    if (!usuario) throw new NotFoundException('Usuário Incorreto!');
    return usuario;
  }
}