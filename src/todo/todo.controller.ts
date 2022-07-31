import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import CreateTodoDto from './dto/create-todo.dto';
import UpdateTodoDto from './dto/update-todo.dto';
import { Todo } from '../lib/entity/domain/todo/todo.entity';
import { TodoService } from './todo.service';
import { TodoStatus } from '@entity/enum/TodoStatus';
import { TodoStatusValidationPipe } from './pipes/todoStatusValidation.pipe';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('')
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto);
  }

  @Get('')
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Patch('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body(new TodoStatusValidationPipe()) updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: number): Promise<boolean> {
    return this.todoService.delete(id);
  }
}
