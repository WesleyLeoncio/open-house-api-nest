import { Module } from "@nestjs/common";
import { CategoriaController } from "./controller/categoria.controller";
import { CategoriaService } from "./service/categoria.service";

@Module({
  imports: [],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule{}