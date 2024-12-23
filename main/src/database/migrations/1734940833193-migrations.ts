import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734940833193 implements MigrationInterface {
  name = 'Migrations1734940833193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "id" character varying(150) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "id" character varying(36) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
  }
}
