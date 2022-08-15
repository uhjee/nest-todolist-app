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
  UseInterceptors,
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
import { ResponseEntity } from '@common/entity/res/response.entity';
import { TransformResponseEntityInterceptor } from '../../interceptors/transform-response-entity.interceptor';

@ApiTags('Todo')
@UseGuards(AuthGuard())
@Controller('api/todo')
export class TodoController {
  private logger = new Logger('TodoController');

  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Todo 생성하기' })
  @UseInterceptors(new TransformResponseEntityInterceptor())
  @Post('')
  async createTodo(
    @Body() createTodoRequestDto: CreateTodoRequestDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return await this.todoService.createTodo(createTodoRequestDto, user);
  }

  @ApiOperation({ summary: 'UserId에 따른 Todo 조회하기' })
  @UseInterceptors(new TransformResponseEntityInterceptor())
  @Get('/user')
  async getTodosByUserId(@GetUser() user: User): Promise<Todo[]> {
    return await this.todoService.getTodosByUserId(user.id);
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
      const todo = await this.todoService.getTodoByTodoId(id);
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
    @Body(new TodoStatusValidationPipe()) updateTodoDto: UpdateTodoRequestDto,
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
  async deleteTodo(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.todoService.deleteTodoById(id, user);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.log(error.name, error.message);
      return ResponseEntity.ERROR_WITH(error.message);
    }
  }
}
