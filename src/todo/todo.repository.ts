import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { TodoStatus } from 'src/lib/entity/enum/TodoStatus';
import { Repository } from 'typeorm';
import CreateTodoDto from './dto/create-todo.dto';
import { Todo } from '../lib/entity/domain/todo/todo.entity';
import { LocalDateTime } from 'js-joda';

@CustomRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { content } = createTodoDto;

    const todo = this.create({
      content,
      status: TodoStatus.NOT_DONE,
    });

    await this.save(todo);
    return todo;
  }

  async deleteTodoById(id: number) {
    const found = await this.findOneBy({ id, deletedAt: null });
    if (!found) return false;
    found.deletedAt = LocalDateTime.now();
    await this.save(found);
    return true;
  }
}
