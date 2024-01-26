import { Module } from '@nestjs/common';
import { CategoriaModule } from "./modules/categoria/categoria.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './infra/config/database.config.service';
import { ConfigModule } from '@nestjs/config';
import { FilmeModule } from './modules/filme/filme.module';
import { RoleModule } from './modules/role/role.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandlers } from './infra/exceptions/filter/exceptionHandlers';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';


@Module({
  imports: [
    CategoriaModule,
    FilmeModule,
    RoleModule,
    UsuarioModule,
    AvaliacaoModule,
    AutenticacaoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandlers
    }
  ]
})
export class AppModule {}
