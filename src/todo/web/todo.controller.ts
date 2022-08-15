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
  UseGuards,
} from '@nestjs/common';
import { CreateTodoRequestDto } from './request/create-todo.request.dto';
import { UpdateTodoRequestDto } from './request/update-todo.request.dto';
import { Todo } from '../application/entity/todo.entity';
import { TodoService } from '../application/todo.service';
import { TodoStatusValidationPipe } from './pipes/todoStatusValidation.pipe';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from '@users/application/entity/user.entity';

@ApiTags('Todo')
@UseGuards(AuthGuard())
@Controller('api/todo')
export class TodoController {
  private logger = new Logger('TodoController');

  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Todo 생성하기' })
  @Post('')
  async createTodo(
    @Body() createTodoRequestDto: CreateTodoRequestDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return await this.todoService.createTodo(createTodoRequestDto, user);
  }

  @ApiOperation({ summary: 'UserId에 따른 Todo 조회하기' })
  @Get('/user')
  async getTodosByUserId(@GetUser() user: User): Promise<Todo[]> {
    return await this.todoService.getTodosByUserId(user.id);
  }

  @ApiOperation({ summary: '모든 Todo 조회하기' })
  @Get('')
  async getAllTodos(): Promise<Todo[]> {
    return await this.todoService.getAllTodos();
  }

  @ApiOperation({ summary: '하나의 Todo 조회하기' })
  @ApiParam({
    name: 'id',
    description: 'todo id',
    required: true,
  })
  @Get('/:id')
  async getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return await this.todoService.getTodoByTodoId(id);
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
    @Body(new TodoStatusValidationPipe()) updateTodoDto: UpdateTodoRequestDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodo(id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Todo 삭제하기' })
  @ApiParam({
    name: 'id',
    description: 'todo의 id',
    required: true,
  })
  @Delete('/:id')
  async deleteTodo(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.todoService.deleteTodoById(id, user);
  }
}
