import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class V2DropConstraintAndAdd1707794170780 implements MigrationInterface {
    name = 'V2DropConstraintAndAdd1707794170780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Exclui a restrição de chave estrangeira existente
        await queryRunner.dropForeignKey('avaliacoes', 'FK_66413181eb487cda3046f9c93b4');

        // Cria uma nova restrição de chave estrangeira
        await queryRunner.createForeignKey('avaliacoes', new TableForeignKey({
            columnNames: ['usuario_id'], // Nome da coluna na tabela 'avaliacoes' que possui a chave estrangeira
            referencedColumnNames: ['id'], // Nome da coluna na tabela referenciada ('usuarios')
            referencedTableName: 'usuarios',
            onDelete: 'CASCADE', // Opção para excluir em cascata
            name: 'FK_66413181eb487cda3046f9c93b5', // Nome da nova chave estrangeira
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recria a restrição de chave estrangeira anterior
        await queryRunner.createForeignKey('avaliacoes', new TableForeignKey({
            columnNames: ['usuario_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuarios',
            onDelete: 'CASCADE',
            name: 'FK_66413181eb487cda3046f9c93b4', // Nome da chave estrangeira anterior
        }));

        // Exclui a nova restrição de chave estrangeira criada
        await queryRunner.dropForeignKey('avaliacoes', 'FK_66413181eb487cda3046f9c93b4');
    }
}