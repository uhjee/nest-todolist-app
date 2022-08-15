import { DataSource } from 'typeorm';
import config from 'config';

const dbConfig = config.get<DbConfig>('db');

export const dataSource = new DataSource({
  type: dbConfig.type as 'mysql', // TODO: 이를 어쩐다
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  // entity: ['src/common/entity/domain/**/*.entity.{js,ts}'],
  entities: [__dirname + '/../common/entity/domain/**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
  logging: true,
});
