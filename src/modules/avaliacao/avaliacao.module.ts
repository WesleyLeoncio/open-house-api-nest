import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IavaliacaoRepository } from './repository/iavaliacao.repository';
import { AvaliacaoRepository } from './repository/avaliacao.repository';
import { AvaliacaoController } from './controller/avaliacao.controller';
import { AvaliacaoService } from './service/avaliacao.service';
import { AvaliacaoDeFilmesEntity } from './models/entity/avaliacaoDeFilmes.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { FilmeModule } from '../filme/filme.module';

@Module({
  imports: [TypeOrmModule.forFeature([AvaliacaoDeFilmesEntity]),
    UsuarioModule, FilmeModule,
  ],
  controllers: [AvaliacaoController],
  providers: [
    AvaliacaoService,
    {
      provide: IavaliacaoRepository,
      useClass: AvaliacaoRepository,
    },
  ],

})
export class AvaliacaoModule {
}