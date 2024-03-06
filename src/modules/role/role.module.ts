import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './models/entity/role.entity';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';
import { IroleRepository } from './repository/irole.repository';
import { RoleRepository } from './repository/role.repository';
import { UsuarioModule } from '../usuario/usuario.module';


@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), UsuarioModule],
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: IroleRepository,
      useClass: RoleRepository,
    },
  ],
  exports: [RoleService],

})
export class RoleModule {
}