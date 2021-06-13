import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddTradeTradingNotes1623294842911 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('trading_notes', new TableColumn({
            name: 'trade',
            type: 'enum',
            enum: ['D', 'S'],
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('trading_notes', 'trade');
    }
}
