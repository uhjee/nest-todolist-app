import { Todo } from '../entity/todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '@users/application/users.service';
import {
  DoingTodo,
  DoneTodo,
  NotDoneTodo,
  TodosGroupByStatusDto,
} from '@todo/application/dto/todos-group-by-status.dto';
import { Repository } from 'typeorm';
import { TodoStatus } from '@todo/application/enum/TodoStatus';
import { InjectRepository } from '@nestjs/typeorm';

export interface TodoQueryService {
  /**
   * 모든 Todo 목록을 조회한다.
   */
  getAllTodos(): Promise<Todo[]>;

  /**
   * 모든 Todo 목록을 status로 그룹화해 조회한다.
   */
  getAllTodosGroupByStatus(): Promise<TodosGroupByStatusDto>;

  /**
   * 특정 사용자가 작성한 Todo 목록을 조회한다.
   * @param userId
   */
  getTodosByUserId(userId: number): Promise<Todo[]>;

  /**
   * 특정 todo Id 를 가진 Todo를 반환한다.
   * @param id
   */
  getTodoByTodoId(id: number): Promise<Todo>;

  /**
   * 특정 todo Id를 가진 Todo의 상세정보를 반환한다.
   * @param id
   */
  getTodoWithDetailByTodoId(id: number): Promise<Todo[]>;
}

@Injectable()
export class TodoRDBQueryService implements TodoQueryService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly usersService: UsersService,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async getTodoByTodoId(id: number): Promise<Todo> {
    const foundUser = this.todoRepository.findOne({ where: { id } });
    if (foundUser) {
      return foundUser;
    }
    throw new NotFoundException(`${id}를 가진 Todo를 찾을 수 없습니다.`);
  }

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    const user = this.usersService.getUserById(userId);
    return await this.todoRepository
      .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.user', 'user', 'user.id = :userId', { userId })
      .getMany();
  }

  async getAllTodosGroupByStatus(): Promise<TodosGroupByStatusDto> {
    const todosGroupByStatusDto: TodosGroupByStatusDto =
      new TodosGroupByStatusDto();
    const notDoneList: NotDoneTodo[] = [];
    const doingList: DoingTodo[] = [];
    const doneList: DoneTodo[] = [];

    const todos: Todo[] = await this.todoRepository
      .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.user', 'user')
      .select([
        'todo.id',
        'todo.content',
        'todo.status',
        'todo.userId',
        'todo.createdAt',
        'todo.updatedAt',
        'user.name',
        'user.role',
        'user.email',
      ])
      .getMany();
    console.log('-> todos', todos);

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

  getTodoWithDetailByTodoId(id: number): Promise<Todo[]> {
    return this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.todoDetail', 'todoDetail')
      .where('todo.id = :id', { id })
      .getMany();
  }
}
