import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: '내일은 밥을 세끼 다 먹어야지',
    description: '할 일을 적어주세요',
    required: true,
  })
  @IsNotEmpty()
  content: string;
}
