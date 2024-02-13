import { MigrationInterface, QueryRunner } from "typeorm";

export class V5AlterTableAddColumnStatusEmUsuario1707794170780 implements MigrationInterface {
    name = 'V5AlterTableAddColumnStatusEmUsuario1707794170780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "status" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "status"`);
    }

}
