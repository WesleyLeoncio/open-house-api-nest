import { MigrationInterface, QueryRunner } from "typeorm";

export class V3AlterTableUniqueNomeRole1707264592294 implements MigrationInterface {
    name = 'V3AlterTableUniqueNomeRole1707264592294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_894f1ce8f4cb35f97cb2b5e0f55" UNIQUE ("nome")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_894f1ce8f4cb35f97cb2b5e0f55"`);
    }

}
