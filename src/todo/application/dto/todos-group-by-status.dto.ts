import { Todo } from '@todo/application/entity/todo.entity';
import { TodoStatus } from '@todo/application/enum/TodoStatus';

export interface NotDoneTodo extends Todo {
  status: TodoStatus.NOT_DONE;
}

export interface DoingTodo extends Todo {
  status: TodoStatus.DOING;
}

export interface DoneTodo extends Todo {
  status: TodoStatus.DONE;
}

export class TodosGroupByStatusDto {
  notDone: NotDoneTodo[];
  doing: DoingTodo[];
  done: DoneTodo[];
}
