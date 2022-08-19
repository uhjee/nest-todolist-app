import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/application/users.module';
import { TodoService } from './todo.service';
import { TodoRDBQueryService } from './todo.query.service';
import { TodoRDBCommandService } from '@todo/application/todo.command.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@todo/application/entity/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), forwardRef(() => UsersModule)],
  providers: [TodoService, TodoRDBQueryService, TodoRDBCommandService],
  controllers: [],
  exports: [TodoService],
})
export class TodoModule {}
