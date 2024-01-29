import { ConsoleLogger, Module } from '@nestjs/common';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './infra/config/database.config.service';
import { ConfigModule } from '@nestjs/config';
import { FilmeModule } from './modules/filme/filme.module';
import { RoleModule } from './modules/role/role.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionHandlers } from './infra/exceptions/filter/exceptionHandlers';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { LoggerGlobalInterceptor } from './modules/security/logger/loggerGlobalInterceptor';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    CategoriaModule,
    FilmeModule,
    RoleModule,
    UsuarioModule,
    AvaliacaoModule,
    AutenticacaoModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 120 * 1000 }),
      }),
      isGlobal: true,
    }),
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
      useClass: ExceptionHandlers,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {
}
