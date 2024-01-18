import { MigrationInterface, QueryRunner } from 'typeorm';

export class V1CreateTables1705602362358 implements MigrationInterface {
  name = 'V1CreateTables1705602362358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "categorias"
                             (
                                 "id"         uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                                 "nome"       character varying(100) NOT NULL,
                                 "created_at" TIMESTAMP              NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP              NOT NULL DEFAULT now(),
                                 "deleted_at" TIMESTAMP,
                                 CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15" UNIQUE ("nome"),
                                 CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categorias"`);
  }

}
