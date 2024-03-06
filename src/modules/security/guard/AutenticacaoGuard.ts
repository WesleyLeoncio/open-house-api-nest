import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto.switchToHttp().getRequest();
    const isPublic: boolean = this.reflector.get<boolean>('isPublic', contexto.getHandler());

    if (isPublic) return true;

    const token: string = this.extrairTokenDoCabecalho(requisicao);
    if (!token) {
      throw new UnauthorizedException('Erro de autenticação.');
    }

    try {
      requisicao.usuario = await this.jwtService.verifyAsync(token);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT inválido');
    }
    return true;
  }

  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}