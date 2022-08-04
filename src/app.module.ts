import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './db/typeorm.config';
import { functionalLogger } from './middlewares/logger.funtional.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), TodoModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  // 전역 미들웨어 적용
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(functionalLogger).forRoutes('*');
  }
}
