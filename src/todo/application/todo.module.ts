import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { UsersModule } from 'src/users/application/users.module';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';
import { TodoRDBQueryService } from './todo.query.service';
import { TodoRDBCommandService } from '@todo/application/todo.command.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([TodoRepository]),
    forwardRef(() => UsersModule),
  ],
  providers: [TodoService, TodoRDBQueryService, TodoRDBCommandService],
  controllers: [],
  exports: [TodoService],
})
export class TodoModule {}
