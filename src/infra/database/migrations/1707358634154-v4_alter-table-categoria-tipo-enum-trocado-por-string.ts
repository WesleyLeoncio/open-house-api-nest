import { MigrationInterface, QueryRunner } from "typeorm";

export class V4AlterTableCategoriaTipoEnumTrocadoPorString1707358634154 implements MigrationInterface {
    name = 'V4AlterTableCategoriaTipoEnumTrocadoPorString1707358634154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "nome"`);
        await queryRunner.query(`DROP TYPE "public"."categorias_nome_enum"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "nome" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15" UNIQUE ("nome")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "nome"`);
        await queryRunner.query(`CREATE TYPE "public"."categorias_nome_enum" AS ENUM('ACAO', 'AVENTURA', 'ANIMACAO', 'COMEDIA', 'CRIME', 'DRAMA', 'DOCUMENTARIO', 'FANTASIA', 'FICCAO_CIENTIFICA', 'TERROR', 'MUSICAL', 'ROMANCE', 'SUSPENSE', 'GUERRA', 'WESTERN', 'BIOGRAFIA', 'MISTERIO', 'POLICIAL', 'ESPORTE', 'TESTE')`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "nome" "public"."categorias_nome_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15" UNIQUE ("nome")`);
    }

}
