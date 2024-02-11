import { MigrationInterface, QueryRunner } from "typeorm";

export class V4AlterTableRolesTipoEnumTrocadoPorString1707693426294 implements MigrationInterface {
    name = 'V4AlterTableRolesTipoEnumTrocadoPorString1707693426294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_894f1ce8f4cb35f97cb2b5e0f55"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "nome"`);
        await queryRunner.query(`DROP TYPE "public"."roles_nome_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "nome" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_894f1ce8f4cb35f97cb2b5e0f55" UNIQUE ("nome")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_894f1ce8f4cb35f97cb2b5e0f55"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "nome"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_nome_enum" AS ENUM('ROLE_MASTER', 'ROLE_ADMIN', 'ROLE_USER', 'ROLE_TESTE')`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "nome" "public"."roles_nome_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_894f1ce8f4cb35f97cb2b5e0f55" UNIQUE ("nome")`);
    }

}
