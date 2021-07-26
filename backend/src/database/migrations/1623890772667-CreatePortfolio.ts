import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreatePortfolio1623890772667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'portfolio',
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
          name: 'average_price',
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
          name: 'entry_date',
          type: 'date',
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

    await queryRunner.createForeignKey('portfolio', new TableForeignKey({
      name: 'PortfolioCustomer',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('portfolio', true)
  }
}
