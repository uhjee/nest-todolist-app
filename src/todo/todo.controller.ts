import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '../lib/entity/domain/todo/todo.entity';
import { TodoService } from './todo.service';
import { TodoStatusValidationPipe } from './pipes/todoStatusValidation.pipe';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '@common/res/response.entity';

@ApiTags('Todo')
@Controller('api/todo')
export class TodoController {
  private logger = new Logger('TodoController');

  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Todo 생성하기' })
  @Post('')
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<ResponseEntity<Todo | string>> {
    try {
      const todo = await this.todoService.createTodo(createTodoDto);
      return ResponseEntity.OK_WITH(todo);
    } catch (error) {
      this.logger.log(error.name, error.message);
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }

  @ApiOperation({ summary: 'UserId에 따른 Todo 조회하기' })
  @Get(':userId/user')
  async getTodosByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseEntity<Todo[] | string>> {
    try {
      const todos = await this.todoService.getTodosByUserId(userId);
      return ResponseEntity.OK_WITH(todos);
    } catch (error) {
      this.logger.log(error.name, error.message);
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }

  @ApiOperation({ summary: '모든 Todo 조회하기' })
  @Get('')
  async getAllTodos(): Promise<ResponseEntity<Todo[] | string>> {
    try {
      const todos = await this.todoService.getAllTodos();
      return ResponseEntity.OK_WITH(todos);
    } catch (error) {
      this.logger.log(error.name, error.message);
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }

  @ApiOperation({ summary: '하나의 Todo 조회하기' })
  @ApiParam({
    name: 'id',
    description: 'todo id',
    required: true,
  })
  @Get('/:id')
  async getTodoById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseEntity<Todo | string>> {
    try {
      const todo = await this.todoService.getTodoById(id);
      return ResponseEntity.OK_WITH(todo);
    } catch (error) {
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }

  @ApiOperation({ summary: 'Todo 수정하기' })
  @ApiParam({
    name: 'id',
    description: 'todo id',
    required: true,
  })
  @Patch('/:id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body(new TodoStatusValidationPipe()) updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseEntity<void | string>> {
    try {
      await this.todoService.updateTodo(id, updateTodoDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.log(error.name, error.message);
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }

  @ApiOperation({ summary: 'Todo 삭제하기' })
  @ApiParam({
    name: 'id',
    description: 'todo id',
    required: true,
  })
  @Delete('/:id')
  async deleteTodo(@Param('id') id: number): Promise<ResponseEntity<string>> {
    try {
      await this.todoService.deleteTodoById(id);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.log(error.name, error.message);
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }
}
