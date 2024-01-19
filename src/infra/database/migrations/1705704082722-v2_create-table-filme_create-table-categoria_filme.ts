import { MigrationInterface, QueryRunner } from "typeorm";

export class V2CreateTableFilmeCreateTableCategoriaFilme1705704082722 implements MigrationInterface {
    name = 'V2CreateTableFilmeCreateTableCategoriaFilme1705704082722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "filmes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(150) NOT NULL, "descricao" text NOT NULL, "data_lancamento" date NOT NULL, "duracao" character varying(30) NOT NULL, "imagem" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_738ab432c6b1b1a937dc05b45f0" UNIQUE ("nome"), CONSTRAINT "UQ_e23ee8dc337835ef1a245b1f42f" UNIQUE ("descricao"), CONSTRAINT "PK_e7531027ca859ab4acb3a313658" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria_filme" ("filme_id" uuid NOT NULL, "categoria_id" uuid NOT NULL, CONSTRAINT "PK_2e31ae5f95e4bb8019a799c31e3" PRIMARY KEY ("filme_id", "categoria_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44cb9cc71b52bc1f98ab014712" ON "categoria_filme" ("filme_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_842de43d5c8fb46b05cfdf7a2b" ON "categoria_filme" ("categoria_id") `);
        await queryRunner.query(`ALTER TABLE "categoria_filme" ADD CONSTRAINT "FK_44cb9cc71b52bc1f98ab0147127" FOREIGN KEY ("filme_id") REFERENCES "filmes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categoria_filme" ADD CONSTRAINT "FK_842de43d5c8fb46b05cfdf7a2be" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria_filme" DROP CONSTRAINT "FK_842de43d5c8fb46b05cfdf7a2be"`);
        await queryRunner.query(`ALTER TABLE "categoria_filme" DROP CONSTRAINT "FK_44cb9cc71b52bc1f98ab0147127"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_842de43d5c8fb46b05cfdf7a2b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44cb9cc71b52bc1f98ab014712"`);
        await queryRunner.query(`DROP TABLE "categoria_filme"`);
        await queryRunner.query(`DROP TABLE "filmes"`);
    }

}
