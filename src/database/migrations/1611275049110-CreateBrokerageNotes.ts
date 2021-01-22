import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateBrokerageNotes1611275049110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'brokerage_notes',
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

    await queryRunner.createForeignKey('brokerage_notes', new TableForeignKey({
      name: 'BrokerageNoteCustomer',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('brokerage_notes', new TableForeignKey({
      name: 'BrokerageNoteBroker',
      columnNames: ['broker_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'brokers',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('brokerage_notes', true);
  }
}