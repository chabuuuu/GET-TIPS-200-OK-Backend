import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734940303601 implements MigrationInterface {
  name = 'Migrations1734940303601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" ("id" character varying(36) NOT NULL, "content" text, "tags" text, "categories" text, "title" text, "date" TIMESTAMP NOT NULL, "views" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "post"`);
  }
}
