import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateAddress1611275048053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'address',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'zipcode',
          type: 'varchar',
        },
        {
          name: 'street',
          type: 'varchar',
        },
        {
          name: 'number',
          type: 'int',
        },
        {
          name: 'additional_info',
          type: 'varchar',
        },
        {
          name: 'district',
          type: 'varchar',
        },
        {
          name: 'city',
          type: 'varchar',
        },
        {
          name: 'state',
          type: 'varchar',
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

    await queryRunner.createForeignKey('address', new TableForeignKey({
      name: 'AddressCustomer',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address', true);
  }
}
