import { Module } from '@nestjs/common';
import { AutenticacaoController } from './controller/autenticacao.controller';
import { AutenticacaoService } from './service/autenticacao.service';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [AutenticacaoController],
  providers: [
    AutenticacaoService
  ]
})

export class AutenticacaoModule {}