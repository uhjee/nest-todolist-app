import { UpdateTodoRequestDto } from '../web/request/update-todo.request.dto';
import { User } from '@users/application/entity/user.entity';
import { CreateTodoRequestDto } from '../web/request/create-todo.request.dto';
import { Todo } from './entity/todo.entity';
import { TodoStatus } from './enum/TodoStatus';
import { TodoRepository } from './todo.repository';
import { DataSource, IsNull } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface TodoCommandService {
  createTodo(createTodoDto: CreateTodoRequestDto, user: User): Promise<Todo>;

  createTodoWithoutLogin(createTodoDto: CreateTodoRequestDto): Promise<Todo>;

  updateTodo(id: number, updateTodoDto: UpdateTodoRequestDto): Promise<Todo>;

  deleteTodoById(id: number, user: User): Promise<void>;

  deleteTodoByIdWithoutLogin(id: number): Promise<void>;
}

@Injectable()
export class TodoRDBCommandService implements TodoCommandService {
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

  async createTodoWithoutLogin(
    createTodoDto: CreateTodoRequestDto,
  ): Promise<Todo> {
    const { content } = createTodoDto;

    return this.todoRepository.save({
      content,
      status: TodoStatus.NOT_DONE,
      user: {
        id: 1,
      },
    });
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

  async deleteTodoByIdWithoutLogin(id: number) {
    const { affected } = await this.todoRepository.softDelete({
      id,
      deletedAt: IsNull(),
    });
    if (!affected)
      throw new NotFoundException(`${id}를 삭제하지 못하였습니다.`);
  }
}
