import { MigrationInterface, QueryRunner } from "typeorm";

export class V2AlterTableUniqueNomeCategoria1707264129473 implements MigrationInterface {
    name = 'V2AlterTableUniqueNomeCategoria1707264129473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15" UNIQUE ("nome")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15"`);
    }

}
