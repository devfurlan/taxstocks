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
          name: 'stock_code',
          type: 'varchar',
        },
        {
          name: 'date',
          type: 'date',
        },
        {
          name: 'quantity',
          type: 'int',
        },
        {
          name: 'transaction_type',
          type: 'varchar',
        },
        {
          name: 'price',
          type: 'decimal',
          precision: 10,
          scale: 2,
        },
        {
          name: 'filename',
          type: 'varchar',
        },
        {
          name: 'customer_id',
          type: 'uuid',
        },
        {
          name: 'broker_id',
          type: 'uuid',
        },
        {
          name: 'uploaded_at',
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
      columnNames: ['broker_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'brokers',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trading_notes', true);
  }
}
