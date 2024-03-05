import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from '../models/request/loginRequest';
import { AutenticacaoService } from '../service/autenticacao.service';
import { ApiTags } from '@nestjs/swagger';
import { Token } from '../models/jwt/token';
@ApiTags('Endpoint De Login')
@Controller('/login')
export class AutenticacaoController {

  constructor(private readonly service: AutenticacaoService) {
  }

  @Post()
  login(@Body() loginRequest: LoginRequest):Promise<Token>{
     return this.service.login(loginRequest.login, loginRequest.senha)
  }

}