import { IsNotEmpty } from 'class-validator';

export default class CreateTodoDto {
  @IsNotEmpty()
  content: string;
}
