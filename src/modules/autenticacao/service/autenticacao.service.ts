import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioEntity } from '../../usuario/models/entity/usuario.entity';
import { Bcrypt } from '../../security/bcrypt';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../models/jwt/payload';
import { Token } from '../models/jwt/token';

@Injectable()
export class AutenticacaoService {

  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService) {
  }

  async login(login: string, senha: string):Promise<Token> {
    const usuario: UsuarioEntity = await this.usuarioService.verificarLogin(login);
    const checkPassword: boolean = await Bcrypt.checkPassword(senha, usuario.senha);
    if (!checkPassword) throw new UnauthorizedException('Senha incorreta!');

    const payload :Payload = { id: usuario.id, nome: usuario.nome, login: usuario.login }

    return { token: await this.jwtService.signAsync(payload) };
  }


}