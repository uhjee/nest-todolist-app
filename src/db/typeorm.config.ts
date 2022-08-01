import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get<DbConfig>('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type as 'mysql', // TODO: 이를 어쩐다
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  // entities: ['src/lib/entity/domain/**/*.entity.{js,ts}'],
  entities: [__dirname + '/../lib/entity/domain/**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
