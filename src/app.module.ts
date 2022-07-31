import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './db/typeorm.config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
