import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeEntity } from './models/entity/filme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmeEntity])],

})
export class FilmeModule {
}