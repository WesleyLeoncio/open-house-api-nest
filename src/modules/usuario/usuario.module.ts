import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './models/entity/usuario.entity';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { IusuarioRepository } from './repository/iusuario.repository';
import { UsuarioRepository } from './repository/usuario.repository';
import { RoleEntity } from '../role/models/entity/role.entity';
import { IroleRepository } from '../role/repository/irole.repository';
import { RoleRepository } from '../role/repository/role.repository';
import { RoleService } from '../role/service/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, RoleEntity])],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    RoleService,
    {
      provide: IusuarioRepository,
      useClass: UsuarioRepository,
    },
    {
      provide: IroleRepository,
      useClass: RoleRepository,
    },
  ],
  exports: [UsuarioService],

})
export class UsuarioModule {
}