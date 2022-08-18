import { Todo } from './entity/todo.entity';
import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { UsersService } from '@users/application/users.service';
import {
  DoingTodo,
  DoneTodo,
  NotDoneTodo,
  TodosGroupByStatusDto,
} from '@todo/application/dto/todos-group-by-status.dto';
import { DataSource } from 'typeorm';
import { TodoStatus } from '@todo/application/enum/TodoStatus';

export interface TodoQueryService {
  getAllTodos(): Promise<Todo[]>;

  getAllTodosGroupByStatus(): Promise<TodosGroupByStatusDto>;

  getTodosByUserId(userId: number): Promise<Todo[]>;

  getTodoByTodoId(id: number): Promise<Todo>;
}

@Injectable()
export class TodoRDBQueryService implements TodoQueryService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
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

  async getAllTodosGroupByStatus(): Promise<TodosGroupByStatusDto> {
    const todosGroupByStatusDto: TodosGroupByStatusDto =
      new TodosGroupByStatusDto();
    const notDoneList: NotDoneTodo[] = [];
    const doingList: DoingTodo[] = [];
    const doneList: DoneTodo[] = [];

    const todos: Todo[] = await this.dataSource
      .getRepository(Todo)
      .createQueryBuilder('todo')
      .select([
        'todo.id AS id',
        'todo.content AS content',
        'todo.status AS status',
        'todo.userId AS userId',
        'todo.createdAt AS createdAt',
        'todo.updatedAt AS updatedAt',
        'user.name AS name',
        'user.role AS role',
        'user.email AS email',
      ])
      .innerJoinAndSelect('todo.user', 'user')
      .getRawMany();

    if (todos.length > 0) {
      todos.forEach((t) => {
        if (t.status === TodoStatus.NOT_DONE) {
          notDoneList.push(t as NotDoneTodo);
        } else if (t.status === TodoStatus.DOING) {
          doingList.push(t as DoingTodo);
        } else if (t.status === TodoStatus.DONE) {
          doneList.push(t as DoneTodo);
        }
      });
    }
    todosGroupByStatusDto.notDone = notDoneList;
    todosGroupByStatusDto.doing = doingList;
    todosGroupByStatusDto.done = doneList;

    return todosGroupByStatusDto;
  }
}
