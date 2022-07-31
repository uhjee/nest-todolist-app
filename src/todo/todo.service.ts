import { Injectable, NotFoundException } from '@nestjs/common';
import CreateTodoDto from './dto/create-todo.dto';
import UpdateTodoDto from './dto/update-todo.dto';
import { Todo } from '../lib/entity/domain/todo/todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto);
  }

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoRepository.find();
    return todos;
  }

  async getTodoById(id: number) {
    const found = await this.todoRepository.findOneBy({
      id,
    });

    if (!found) {
      throw new NotFoundException(
        `${id}의 ID를 가진 Todo 를 찾을 수 없습니다.`,
      );
    }
    return found;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const found = await this.todoRepository.findOneBy({ id });

    const { status, content } = updateTodoDto;

    if (status) {
      found.status = status;
    }
    if (content) {
      found.content = content;
    }
    await this.todoRepository.save(found);
    return found;
  }

  async delete(id: number): Promise<boolean> {
    return this.todoRepository.deleteTodoById(id);
  }
}
