import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './db/typeorm.config';
import { functionalLogger } from './middlewares/logger.funtional.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersWebModule } from '@users/web/users.web.module';
import { TodoWebModule } from '@todo/web/todo.web.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TodoWebModule,
    UsersWebModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  // 전역 미들웨어 적용
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(functionalLogger).forRoutes('*');
  }
}
