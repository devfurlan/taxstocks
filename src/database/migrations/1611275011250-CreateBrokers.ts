import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBrokers1611275011250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'brokers',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'cnpj',
          type: 'char',
          length: '11',
          isUnique: true,
        },
        {
          name: 'website',
          type: 'varchar',
          isNullable: true,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('brokers', true);
  }
}
