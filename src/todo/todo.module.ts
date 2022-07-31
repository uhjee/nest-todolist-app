import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TodoRepository])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
