import { MigrationInterface, QueryRunner } from 'typeorm';

export class V3CreateTableUsuarioCreateTableRoleCreateTableProfiles1705723563618 implements MigrationInterface {
  name = 'V3CreateTableUsuarioCreateTableRoleCreateTableProfiles1705723563618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."roles_nome_enum" AS ENUM('ROLE_MASTER', 'ROLE_ADMIN', 'ROLE_USER', 'ROLE_TESTE')`);
    await queryRunner.query(`CREATE TABLE "roles"
                             (
                                 "id"         uuid                       NOT NULL DEFAULT uuid_generate_v4(),
                                 "nome"       "public"."roles_nome_enum" NOT NULL,
                                 "created_at" TIMESTAMP                  NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP                  NOT NULL DEFAULT now(),
                                 "deleted_at" TIMESTAMP,
                                 CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "usuarios"
                             (
                                 "id"         uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                                 "nome"       character varying(150) NOT NULL,
                                 "login"      character varying(150) NOT NULL,
                                 "senha"      character varying(255) NOT NULL,
                                 "created_at" TIMESTAMP              NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP              NOT NULL DEFAULT now(),
                                 "deleted_at" TIMESTAMP,
                                 CONSTRAINT "UQ_0c0fcf4a8c228628476a29ea302" UNIQUE ("login"),
                                 CONSTRAINT "UQ_09123a64c09426e71457354d875" UNIQUE ("senha"),
                                 CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "profiles"
                             (
                                 "usuario_id" uuid NOT NULL,
                                 "role_id"    uuid NOT NULL,
                                 CONSTRAINT "PK_dfa6fc79a4f9fc5cd09e49a1f45" PRIMARY KEY ("usuario_id", "role_id")
                             )`);
    await queryRunner.query(`CREATE INDEX "IDX_3576224ad0b136c33d51e58e78" ON "profiles" ("usuario_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_ce03e7ba059ea841022d7865cf" ON "profiles" ("role_id") `);
    await queryRunner.query(`ALTER TABLE "profiles"
        ADD CONSTRAINT "FK_3576224ad0b136c33d51e58e78b" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "profiles"
        ADD CONSTRAINT "FK_ce03e7ba059ea841022d7865cf8" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ce03e7ba059ea841022d7865cf8"`);
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_3576224ad0b136c33d51e58e78b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ce03e7ba059ea841022d7865cf"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3576224ad0b136c33d51e58e78"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TABLE "usuarios"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TYPE "public"."roles_nome_enum"`);
  }

}
