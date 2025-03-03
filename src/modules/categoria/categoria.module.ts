import { Module } from '@nestjs/common';
import { CategoriaController } from './controller/categoria.controller';
import { CategoriaService } from './service/categoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './models/entity/categoria.entity';
import { IcategoriaRepository } from './repository/icategoria.repository';
import { CategoriaRepository } from './repository/categoria.repository';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEntity]), UsuarioModule],
  controllers: [CategoriaController],
  providers: [
    CategoriaService,
    {
      provide: IcategoriaRepository,
      useClass: CategoriaRepository,
    },
  ],
})
export class CategoriaModule {
}