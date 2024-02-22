import "reflect-metadata"
import { DataSource, DataSourceOptions, getMetadataArgsStorage } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import * as path from 'path';

const pathRootProject = path.resolve(__dirname, '..');

const env = 'local'; // process.env.APP_ENV;
const migrationsRun = true;
const migrationsTableName = 'migrations';

const migrationFolder =
  env === 'local'
    ? path.join(__dirname, `..${path.sep}${migrationsTableName}`)
    : `${path.sep}${migrationsTableName}`;

const ext = path.extname(__filename);

const dataSource = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "sakila",
    password: "sakila",
    database: "sakila",
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
    entities: [
      `${pathRootProject}/src/**/**.entity.{ts,js}`,
      // `${pathRootProject}/**/**/**.entity.{ts,js}`,
      // `**/*.entity${ext}`, // used for typeorm CLI in local development
      ...getMetadataArgsStorage().tables.map((tbl) => tbl.target), // used for proper HMR work
    ],
    migrations: [`${migrationFolder}${path.sep}*${ext}`],
    migrationsTableName: migrationsTableName,
    migrationsRun: migrationsRun,
    namingStrategy: new SnakeNamingStrategy(),
    subscribers: [],
  } as DataSourceOptions

export const AppDataSource = new DataSource(dataSource);
