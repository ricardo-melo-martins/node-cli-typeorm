import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1708579188723 implements MigrationInterface {
  name = 'Test1708579188723'

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
          CREATE TABLE \`user\` (
              \`id\` int NOT NULL AUTO_INCREMENT,
              \`first_name\` varchar(255) NOT NULL,
              \`last_name\` varchar(255) NOT NULL,
              \`age\` int NOT NULL,
              PRIMARY KEY (\`id\`)
          ) ENGINE = InnoDB
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
          DROP TABLE \`user\`
      `);
  }

}
