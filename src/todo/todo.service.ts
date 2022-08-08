import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@entity/domain/todo.entity';
import { TodoRepository } from './todo.repository';
import { UsersService } from 'src/users/users.service';
import { User } from '@entity/domain/user.entity';
import { DataSource } from 'typeorm';
import { query } from 'express';
import { TodoStatus } from '@entity/enum/TodoStatus';

@Injectable()
export class TodoService {
  private logger = new Logger('TodoService');

  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return await this.todoRepository.createTodo(createTodoDto, user);
  }

  /**
   * 트랜잭션 처리 연습을 위한 Todo 생성
   * @param createTodoDto
   * @param user
   */
  async createTodoWithQueryRunner(
    createTodoDto: CreateTodoDto,
    user: User,
  ): Promise<Todo> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { content } = createTodoDto;
      const todo = this.todoRepository.create({
        content,
        status: TodoStatus.NOT_DONE,
        user: {
          id: user.id,
          // email: user.email,
          // role: user.role,
          // name: user.name,
        },
      });
      // transaction TEST
      // if (user.id === 2) throw new NotFoundException();
      await queryRunner.commitTransaction();
      return await queryRunner.manager.save(todo);
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
