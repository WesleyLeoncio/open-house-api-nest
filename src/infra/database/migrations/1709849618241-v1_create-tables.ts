import { MigrationInterface, QueryRunner } from "typeorm";

export class V1CreateTables1709849618241 implements MigrationInterface {
    name = 'V1CreateTables1709849618241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_894f1ce8f4cb35f97cb2b5e0f55" UNIQUE ("nome"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15" UNIQUE ("nome"), CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "filmes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(150) NOT NULL, "descricao" text NOT NULL, "data_lancamento" date NOT NULL, "duracao" character varying(30) NOT NULL, "imagem" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_738ab432c6b1b1a937dc05b45f0" UNIQUE ("nome"), CONSTRAINT "PK_e7531027ca859ab4acb3a313658" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "avaliacoes" ("filme_id" uuid NOT NULL, "usuario_id" uuid NOT NULL, "nota" integer NOT NULL, CONSTRAINT "PK_b2ee1a4fe50f931fc3e2f39dfda" PRIMARY KEY ("filme_id", "usuario_id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(150) NOT NULL, "login" character varying(150) NOT NULL, "senha" character varying(255) NOT NULL, "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_0c0fcf4a8c228628476a29ea302" UNIQUE ("login"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria_filme" ("filme_id" uuid NOT NULL, "categoria_id" uuid NOT NULL, CONSTRAINT "PK_2e31ae5f95e4bb8019a799c31e3" PRIMARY KEY ("filme_id", "categoria_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44cb9cc71b52bc1f98ab014712" ON "categoria_filme" ("filme_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_842de43d5c8fb46b05cfdf7a2b" ON "categoria_filme" ("categoria_id") `);
        await queryRunner.query(`CREATE TABLE "profiles" ("usuario_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_dfa6fc79a4f9fc5cd09e49a1f45" PRIMARY KEY ("usuario_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3576224ad0b136c33d51e58e78" ON "profiles" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce03e7ba059ea841022d7865cf" ON "profiles" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_dc384c9c1c97dd4571d46826577" FOREIGN KEY ("filme_id") REFERENCES "filmes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_66413181eb487cda3046f9c93b4" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categoria_filme" ADD CONSTRAINT "FK_44cb9cc71b52bc1f98ab0147127" FOREIGN KEY ("filme_id") REFERENCES "filmes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categoria_filme" ADD CONSTRAINT "FK_842de43d5c8fb46b05cfdf7a2be" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_3576224ad0b136c33d51e58e78b" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ce03e7ba059ea841022d7865cf8" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ce03e7ba059ea841022d7865cf8"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_3576224ad0b136c33d51e58e78b"`);
        await queryRunner.query(`ALTER TABLE "categoria_filme" DROP CONSTRAINT "FK_842de43d5c8fb46b05cfdf7a2be"`);
        await queryRunner.query(`ALTER TABLE "categoria_filme" DROP CONSTRAINT "FK_44cb9cc71b52bc1f98ab0147127"`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_66413181eb487cda3046f9c93b4"`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_dc384c9c1c97dd4571d46826577"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce03e7ba059ea841022d7865cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3576224ad0b136c33d51e58e78"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_842de43d5c8fb46b05cfdf7a2b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44cb9cc71b52bc1f98ab014712"`);
        await queryRunner.query(`DROP TABLE "categoria_filme"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "avaliacoes"`);
        await queryRunner.query(`DROP TABLE "filmes"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
