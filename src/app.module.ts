import { Module } from '@nestjs/common';
import { CategoriaModule } from "./modules/categoria/categoria.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database.config.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    CategoriaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService],
    }),
  ],
})
export class AppModule {}
