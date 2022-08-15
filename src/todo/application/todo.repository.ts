import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { TodoStatus } from './enum/TodoStatus';
import { DataSource, IsNull, Repository } from 'typeorm';
import { CreateTodoRequestDto } from '../web/request/create-todo.request.dto';
import { Todo } from './entity/todo.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '@users/application/entity/user.entity';

@CustomRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.find({
      where: {
        deletedAt: null,
      },
    });
    return todos;
  }

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    console.log('lala');
    return await this.createQueryBuilder('todo')
      .innerJoinAndSelect('todo.user', 'user')
      // .where('todo.deletedAt IS NULL')
      .andWhere('user.id = :userId', { userId })
      // .andWhere('user.deletedAt IS NULL')
      // .groupBy('todo.status')
      .getMany();
    // return await this.find({
    //   where: {
    //     deletedAt: IsNull(),
    //     user: {
    //       deletedAt: IsNull(),
    //       id: userId,
    //     },
    //   },
    // });
  }

  async getTodoById(id: number): Promise<Todo> {
    const found = await this.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });
    if (!found)
      throw new NotFoundException(
        `${id}의 ID를 가진 Todo 를 찾을 수 없습니다.`,
      );

    return found;
  }

  async createTodo(
    createTodoDto: CreateTodoRequestDto,
    user: User,
  ): Promise<Todo> {
    const { content } = createTodoDto;
    const todo = this.create({
      content,
      status: TodoStatus.NOT_DONE,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });

    await this.save(todo);
    return todo;
  }

  async deleteTodoById(id: number, userId: number) {
    const { affected } = await this.softDelete({
      id,
      deletedAt: IsNull(),
      user: { id: userId },
    });
    console.log(affected);
    if (!affected)
      throw new NotFoundException(`${id}를 삭제하지 못하였습니다.`);
  }
}
