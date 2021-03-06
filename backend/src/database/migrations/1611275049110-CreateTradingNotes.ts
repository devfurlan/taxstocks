import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateTradingNotes1611275049110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'trading_notes',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'code',
          type: 'varchar',
        },
        {
          name: 'ticker',
          type: 'varchar',
        },
        {
          name: 'quantity',
          type: 'int',
        },
        {
          name: 'price',
          type: 'decimal',
          precision: 10,
          scale: 2,
        },
        {
          name: 'total',
          type: 'decimal',
          precision: 10,
          scale: 2,
        },
        {
          name: 'type',
          type: 'varchar',
        },
        {
          name: 'trade',
          type: 'enum',
          enum: ['D', 'S'],
        },
        {
          name: 'date',
          type: 'date',
        },
        {
          name: 'customer_id',
          type: 'uuid',
        },
        {
          name: 'broker_cnpj',
          type: 'char',
          length: '14',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createForeignKey('trading_notes', new TableForeignKey({
      name: 'TradingNoteCustomer',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('trading_notes', new TableForeignKey({
      name: 'TradingNoteBroker',
      columnNames: ['broker_cnpj'],
      referencedColumnNames: ['cnpj'],
      referencedTableName: 'brokers',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trading_notes', true);
  }
}
