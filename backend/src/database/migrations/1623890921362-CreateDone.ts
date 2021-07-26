import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateDone1623890921362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'done',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
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
          name: 'entry_price',
          type: 'decimal',
          precision: 10,
          scale: 2,
        },
        {
          name: 'entry_date',
          type: 'date',
        },
        {
          name: 'exit_price',
          type: 'decimal',
          precision: 10,
          scale: 2,
        },
        {
          name: 'exit_date',
          type: 'date',
        },
        {
          name: 'balance',
          type: 'decimal',
          precision: 10,
          scale: 2,
        },
        {
          name: 'trade',
          type: 'enum',
          enum: ['D', 'S'],
        },
        {
          name: 'customer_id',
          type: 'uuid',
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

    await queryRunner.createForeignKey('done', new TableForeignKey({
      name: 'DoneCustomer',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('done', true);
  }
}
