import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IavaliacaoRepository } from './repository/iavaliacao.repository';
import { AvaliacaoRepository } from './repository/avaliacaoRepository';
import { AvaliacaoController } from './controller/avaliacao.controller';
import { AvaliacaoService } from './service/avaliacao.service';
import { AvaliacaoDeFilmesEntity } from './models/entity/avaliacaoDeFilmes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvaliacaoDeFilmesEntity])],
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