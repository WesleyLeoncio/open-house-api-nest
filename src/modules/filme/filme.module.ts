import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeEntity } from './models/entity/filme.entity';
import { IfilmeRepository } from './repository/ifilme.repository';
import { FilmeRepository } from './repository/filme.repository';
import { FilmeController } from './controller/filme.controller';
import { FilmeService } from './service/filme.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmeEntity])],
  controllers: [FilmeController],
  providers: [
    FilmeService,
    {
      provide: IfilmeRepository,
      useClass: FilmeRepository
    },
  ]

})
export class FilmeModule {
}