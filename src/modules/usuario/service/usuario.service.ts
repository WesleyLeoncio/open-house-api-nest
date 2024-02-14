import { Injectable, NotFoundException } from '@nestjs/common';
import { IusuarioRepository } from '../repository/iusuario.repository';
import { UsuarioEntity } from '../models/entity/usuario.entity';
import { UsuarioRequest } from '../models/request/usuarioRequest';
import { MapperUsuario } from '../models/mapper/mapperUsuario';
import { Bcrypt } from '../../security/bcrypt';
import { Pageable } from '../../utils/pageable/pageable';
import { PageableResponse } from '../../utils/pageable/models/pageableResponse';
import { UsuarioResponse } from '../models/response/usuarioResponse';
import { DeleteResult } from 'typeorm';
import { RoleService } from '../../role/service/role.service';
import { Roles } from '../../role/models/enum/Roles';
import { UsuarioRequestComum } from '../models/request/usuarioRequestComum';
import { RoleEntity } from '../../role/models/entity/role.entity';


@Injectable()
export class UsuarioService {

  constructor(
    private readonly usuarioRepository: IusuarioRepository,
    private readonly roleService: RoleService,
  ) {
  }

  async criarUsuario(request: UsuarioRequest): Promise<UsuarioResponse> {
    request.senha = await Bcrypt.passwordHash(request.senha);
    const entity: UsuarioEntity = MapperUsuario.usuarioRequestToUsuarioEntity(request);
    return MapperUsuario.usuarioEntityToUsuarioResponse(await this.usuarioRepository.create(entity));
  }

  //TODO CRIAR USUARIO COMUM
  async criarUsuarioComum(request: UsuarioRequestComum): Promise<UsuarioResponse> {
    const role: RoleEntity = await this.roleService.buscarRolePeloNome(Roles.USER);
    request.senha = await Bcrypt.passwordHash(request.senha);
    const entity: UsuarioEntity = MapperUsuario.usuarioRequestComumToUsuarioEntity(request);
    entity.roles = [role];
    return MapperUsuario.usuarioEntityToUsuarioResponse(await this.usuarioRepository.create(entity));
  }


  //TODO ALTERAR STATUS DO USUARIO

  async listarTodosUsuarios(page: number, size: number, filter: string): Promise<PageableResponse<UsuarioResponse>> {
    const pageable: Pageable<UsuarioResponse> = new Pageable(page, size, filter);
    const [content, totalElements] = await this.usuarioRepository.findAll(pageable.pagination);
    return pageable.getPageableData(totalElements, MapperUsuario.usuarioEntityListToUsuarioResponseList(content));
  }

  async buscarPorId(id: string): Promise<UsuarioResponse> {
    return MapperUsuario.usuarioEntityToUsuarioResponse(await this.verificarUsuario(id));
  }

  async atualizarUsario(id: string, request: UsuarioRequest): Promise<UsuarioResponse> {
    const entity: UsuarioEntity = await this.verificarUsuario(id);
    Object.assign(entity, <UsuarioEntity>request);
    return MapperUsuario.usuarioEntityToUsuarioResponse(await this.usuarioRepository.update(entity));
  }

  async atualizarStatus(id: string): Promise<void> {
    const usuario: UsuarioEntity = await this.verificarUsuario(id);
    usuario.status = !usuario.status;
    await this.usuarioRepository.update(usuario);
  }

  async verificarLogin(login: string): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findByLogin(login);
    if (!usuario) throw new NotFoundException('Usuário Incorreto!');
    return usuario;
  }

  async verificarUsuario(id: string): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findById(id);
    if (!usuario) throw new NotFoundException('Usuário Incorreto!');
    return usuario;
  }

  async deletarUsuario(id: string): Promise<DeleteResult> {
    await this.verificarUsuario(id);
    return await this.usuarioRepository.delete(id);
  }
}