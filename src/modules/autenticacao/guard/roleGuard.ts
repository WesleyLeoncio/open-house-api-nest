import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './decorators/roles.decorator';
import { UsuarioService } from '../../usuario/service/usuario.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usuarioService: UsuarioService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get(Roles, context.getHandler());
    console.log(`Roles: ${roles}`)
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.usuario;
    const usuario = await this.usuarioService.verificarUsuarioById(user.id);
    console.log(usuario.role)
    return usuario.role.map((role) => role.nome).some((role) =>roles.includes(role));
  }
}