import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from '../models/request/loginRequest';
import { AutenticacaoService } from '../service/autenticacao.service';

@Controller('/login')
export class AutenticacaoController {

  constructor(private readonly service: AutenticacaoService) {
  }

  @Post()
  login(@Body() loginRequest: LoginRequest){
     return this.service.login(loginRequest.login, loginRequest.senha)
  }

}