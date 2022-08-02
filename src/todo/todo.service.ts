import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '../lib/entity/domain/todo/todo.entity';
import { TodoRepository } from './todo.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodoService {
  private logger = new Logger('TodoService');

  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly usersService: UsersService,
  ) {}

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto);
  }

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.getAllTodos();
  }

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    this.usersService.getUserById(userId);

    return await this.todoRepository.getTodosByUserId(userId);
  }

  async getTodoById(id: number): Promise<Todo> {
    return await this.todoRepository.getTodoById(id);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<void> {
    await this.todoRepository.update({ id }, updateTodoDto);
  }

  async deleteTodoById(id: number): Promise<void> {
    return this.todoRepository.deleteTodoById(id);
  }
}
