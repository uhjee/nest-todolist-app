import { Todo } from '@todo/application/entity/todo.entity';

export class TodosGroupByStatusDto {
  notDone: Todo[];
  doing: Todo[];
  done: Todo[];
}
