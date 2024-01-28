import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { PreAuthorize } from './decorators/PreAuthorize.decorator';
import { Roles } from '../../role/models/enum/Roles';
import { UsuarioEntity } from '../../usuario/models/entity/usuario.entity';
import { RoleEntity } from '../../role/models/entity/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usuarioService: UsuarioService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Roles[] = this.reflector.get(PreAuthorize, context.getHandler());
    console.log(`Roles: ${roles}`);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.usuario;

    return await this.verificarRoles(roles, user.id);
  }

  private async verificarRoles(roles: Roles[], userId: string): Promise<boolean> {
    const usuario: UsuarioEntity = await this.usuarioService.verificarUsuarioById(userId);
    return usuario.roles.map((role: RoleEntity) => role.nome).some((role: Roles) => roles.includes(role));
  }
}