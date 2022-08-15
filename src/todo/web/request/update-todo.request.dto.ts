import { UsePipes } from '@nestjs/common';
import { TodoStatus } from '../../application/enum/TodoStatus';
import { TodoStatusValidationPipe } from '../pipes/todoStatusValidation.pipe';
import { isNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoRequestDto {
  @ApiProperty({
    example: '내일은 두끼만 먹어야지',
    description: '할 일을 적어주세요.',
  })
  content: string;

  @ApiProperty({
    example: '2',
    description: 'Todo의 상태입니다.  0: NOT_DONE, 1: DOING, 2: DONE',
  })
  status: TodoStatus;
}
