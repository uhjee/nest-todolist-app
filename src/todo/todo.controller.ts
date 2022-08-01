import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import CreateTodoDto from './dto/create-todo.dto';
import UpdateTodoDto from './dto/update-todo.dto';
import { Todo } from '../lib/entity/domain/todo/todo.entity';
import { TodoService } from './todo.service';
import { TodoStatusValidationPipe } from './pipes/todoStatusValidation.pipe';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Todo 생성하기' })
  @Post('')
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto);
  }

  @ApiOperation({ summary: '모든 Todo 조회하기' })
  @Get('')
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @ApiOperation({ summary: '하나의 Todo 조회하기' })
  @ApiParam({
    name: 'id',
    description: 'todo id',
    required: true,
  })
  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @ApiOperation({ summary: 'Todo 수정하기' })
  @ApiParam({
    name: 'id',
    description: 'todo id',
    required: true,
  })
  @Patch('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body(new TodoStatusValidationPipe()) updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Todo 삭제하기' })
  @ApiParam({
    name: 'id',
    description: 'todo id',
    required: true,
  })
  @Delete('/:id')
  deleteTodo(@Param('id') id: number): Promise<boolean> {
    return this.todoService.delete(id);
  }
}
