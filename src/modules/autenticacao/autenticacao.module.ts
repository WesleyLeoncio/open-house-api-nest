import { Module } from '@nestjs/common';
import { AutenticacaoController } from './controller/autenticacao.controller';
import { AutenticacaoService } from './service/autenticacao.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsuarioModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return{
          secret: configService.get<string>('SECRET_JWT'),
          signOptions: {expiresIn: '2h'}
        }
      },
      inject: [ConfigService],
      global: true
    })
  ],
  controllers: [AutenticacaoController],
  providers: [
    AutenticacaoService
  ]
})

export class AutenticacaoModule {}