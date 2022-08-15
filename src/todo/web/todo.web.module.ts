import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoModule } from '../application/todo.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TodoModule, AuthModule],
  controllers: [TodoController],
})
export class TodoWebModule {}
