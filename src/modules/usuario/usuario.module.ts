import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './models/entity/usuario.entity';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { IusuarioRepository } from './repository/iusuario.repository';
import { UsuarioRepository } from './repository/usuario.repository';
import { RoleEntity } from '../role/models/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, RoleEntity])],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    {
      provide: IusuarioRepository,
      useClass: UsuarioRepository
    }
  ]

})
export class UsuarioModule {
}