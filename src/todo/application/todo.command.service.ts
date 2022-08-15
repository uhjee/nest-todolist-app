import { UpdateTodoRequestDto } from '../web/request/update-todo.request.dto';
import { User } from '../../users/application/entity/user.entity';
import { CreateTodoRequestDto } from '../web/request/create-todo.request.dto';
import { Todo } from './entity/todo.entity';
import { TodoStatus } from './enum/TodoStatus';
import { TodoRepository } from './todo.repository';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

export interface ITodoCommandService {
  createTodo(createTodoDto: CreateTodoRequestDto, user: User): Promise<Todo>;

  updateTodo(id: number, updateTodoDto: UpdateTodoRequestDto): Promise<Todo>;

  deleteTodoById(id: number, user: User): Promise<void>;
}

@Injectable()
export class TodoCommandService implements ITodoCommandService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private dataSource: DataSource,
  ) {}

  /**
   * 트랜잭션 처리 연습을 위한 Todo 생성
   * @param createTodoDto
   * @param user
   */
  async createTodo(
    createTodoDto: CreateTodoRequestDto,
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
        },
      });
      // transaction TEST
      // if (user.id === 2) throw new NotFoundException();
      await queryRunner.commitTransaction();
      return await queryRunner.manager.save(todo);
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateTodo(
    id: number,
    updateTodoDto: UpdateTodoRequestDto,
  ): Promise<Todo> {
    return this.todoRepository.updateTodo(id, updateTodoDto);
  }

  async deleteTodoById(id: number, user: User): Promise<void> {
    return this.todoRepository.deleteTodoById(id, user.id);
  }
}
