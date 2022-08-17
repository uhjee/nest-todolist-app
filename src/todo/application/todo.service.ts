import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateTodoRequestDto } from '../web/request/create-todo.request.dto';
import { UpdateTodoRequestDto } from '../web/request/update-todo.request.dto';
import { Todo } from './entity/todo.entity';
import { User } from '@users/application/entity/user.entity';
import { TodoQueryService, TodoRDBQueryService } from './todo.query.service';
import {
  TodoCommandService,
  TodoRDBCommandService,
} from './todo.command.service';
import { TodosGroupByStatusDto } from '@todo/application/dto/todos-group-by-status.dto';

@Injectable()
export class TodoService implements TodoCommandService, TodoQueryService {
  private logger = new Logger('TodoService');

  constructor(
    @Inject(TodoRDBQueryService)
    private readonly todoQueryService: TodoQueryService,
    @Inject(TodoRDBCommandService)
    private readonly todoCommandService: TodoCommandService,
  ) {}

  async createTodo(
    createTodoRequestDto: CreateTodoRequestDto,
    user: User,
  ): Promise<Todo> {
    return await this.todoCommandService.createTodo(createTodoRequestDto, user);
  }

  async createTodoWithoutLogin(
    createTodoDto: CreateTodoRequestDto,
  ): Promise<Todo> {
    return await this.todoCommandService.createTodoWithoutLogin(createTodoDto);
  }

  async updateTodo(
    id: number,
    updateTodoRequestDto: UpdateTodoRequestDto,
  ): Promise<Todo> {
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

  async deleteTodoByIdWithoutLogin(id: number): Promise<void> {
    return await this.todoCommandService.deleteTodoByIdWithoutLogin(id);
  }

  async getAllTodosGroupByStatus(): Promise<TodosGroupByStatusDto> {
    return await this.todoQueryService.getAllTodosGroupByStatus();
  }
}
