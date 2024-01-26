import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioEntity } from '../../usuario/models/entity/usuario.entity';
import { Bcrypt } from '../../security/bcrypt';
import { UsuarioService } from '../../usuario/service/usuario.service';

@Injectable()
export class AutenticacaoService {

  constructor(private readonly usuarioService: UsuarioService){
  }

  async login(login: string, senha: string){
    const usuario: UsuarioEntity = await this.usuarioService.verificarLogin(login);
    const checkPassword: boolean = await Bcrypt.checkPassword(senha, usuario.senha);
    if (!checkPassword) throw new UnauthorizedException('Senha incorreta!');
    return usuario;
  }




}