import { UsePipes } from '@nestjs/common';
import { TodoStatus } from '@entity/enum/TodoStatus';
import { TodoStatusValidationPipe } from '../pipes/todoStatusValidation.pipe';

export default class UpdateTodoDto {
  content: string;
  status: TodoStatus;
}
