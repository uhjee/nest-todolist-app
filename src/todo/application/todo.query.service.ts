import { Todo } from './entity/todo.entity';
import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { UsersService } from '@users/application/users.service';

export interface TodoQueryService {
  getAllTodos(): Promise<Todo[]>;

  getTodosByUserId(userId: number): Promise<Todo[]>;

  getTodoByTodoId(id: number): Promise<Todo>;
}

@Injectable()
export class TodoRDBQueryService implements TodoQueryService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly usersService: UsersService,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.getAllTodos();
  }

  async getTodoByTodoId(id: number): Promise<Todo> {
    return await this.todoRepository.getTodoById(id);
  }

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    await this.usersService.getUserById(userId);
    return await this.todoRepository.getTodosByUserId(userId);
  }
}
