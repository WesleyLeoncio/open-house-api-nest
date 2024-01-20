import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './models/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],

})
export class RoleModule {
}