import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoRequestDto } from '../web/request/create-todo.request.dto';
import { UpdateTodoRequestDto } from '../web/request/update-todo.request.dto';
import { Todo } from './entity/todo.entity';
import { User } from '@users/application/entity/user.entity';
import { ITodoQueryService, TodoQueryService } from './todo.query.service';
import {
  ITodoCommandService,
  TodoCommandService,
} from './todo.command.service';

@Injectable()
export class TodoService implements ITodoCommandService, ITodoQueryService {
  private logger = new Logger('TodoService');

  constructor(
    private readonly todoQueryService: TodoQueryService,
    private readonly todoCommandService: TodoCommandService,
  ) {}

  async createTodo(
    createTodoRequestDto: CreateTodoRequestDto,
    user: User,
  ): Promise<Todo> {
    return await this.todoCommandService.createTodo(createTodoRequestDto, user);
  }

  async updateTodo(
    id: number,
    updateTodoRequestDto: UpdateTodoRequestDto,
  ): Promise<void> {
    return await this.todoCommandService.updateTodo(id, updateTodoRequestDto);
  }

  async deleteTodoById(id: number, user: User): Promise<void> {
    await this.todoCommandService.deleteTodoById(id, user);
  }

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoQueryService.getAllTodos();
  }

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    return await this.todoQueryService.getTodosByUserId(userId);
  }

  async getTodoByTodoId(id: number): Promise<Todo> {
    return await this.todoQueryService.getTodoByTodoId(id);
  }
}
