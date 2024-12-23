import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734943595080 implements MigrationInterface {
  name = 'Migrations1734943595080';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "thumbnail" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "thumbnail"`);
  }
}
