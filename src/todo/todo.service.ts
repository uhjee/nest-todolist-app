import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@entity/domain/todo.entity';
import { TodoRepository } from './todo.repository';
import { UsersService } from 'src/users/users.service';
import { User } from '@entity/domain/user.entity';

@Injectable()
export class TodoService {
  private logger = new Logger('TodoService');

  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly usersService: UsersService,
  ) {}

  createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.getAllTodos();
  }

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    await this.usersService.getUserById(userId);

    return await this.todoRepository.getTodosByUserId(userId);
  }

  async getTodoById(id: number): Promise<Todo> {
    return await this.todoRepository.getTodoById(id);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<void> {
    await this.todoRepository.update({ id }, updateTodoDto);
  }

  async deleteTodoById(id: number, user: User): Promise<void> {
    return this.todoRepository.deleteTodoById(id, user.id);
  }
}
