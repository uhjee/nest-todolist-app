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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from '@users/application/entity/user.entity';
import { TodosGroupByStatusDto } from '@todo/application/dto/todos-group-by-status.dto';

@ApiTags('Todo')
// @UseGuards(AuthGuard())
@Controller('api/todo')
export class TodoController {
  private logger = new Logger('TodoController');

  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'UserId에 따른 Todo 조회하기' })
  @Get('/user')
  async getTodosByUserId(@GetUser() user: User): Promise<Todo[]> {
    return await this.todoService.getTodosByUserId(user.id);
  }

  @ApiOperation({ summary: '[TODO] 모든 Todo 조회하기' })
  @ApiOkResponse({
    type: Array<Todo>,
  })
  @Get('')
  async getAllTodos(): Promise<Todo[]> {
    return await this.todoService.getAllTodos();
  }

  @ApiOperation({ summary: '[TODO] 모든 Todo를 status로 그룹화해 반환한다.' })
  @ApiOkResponse({
    type: TodosGroupByStatusDto,
  })
  @Get('/status')
  async getAllTodosGroupByStatus() {
    return await this.todoService.getAllTodosGroupByStatus();
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

  @ApiOperation({ summary: 'Todo 생성하기' })
  @Post('')
  async createTodo(
    @Body() createTodoRequestDto: CreateTodoRequestDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return await this.todoService.createTodo(createTodoRequestDto, user);
  }

  @ApiOperation({ summary: '[TODO] Todo 생성하기 - 로그인 없이' })
  @ApiBody({
    description: 'content만 쓰시면 됩니다.',
    type: CreateTodoRequestDto,
  })
  @Post('without-login')
  async createTodoWithoutLogin(
    @Body() createTodoRequestDto: CreateTodoRequestDto,
  ): Promise<Todo> {
    return await this.todoService.createTodoWithoutLogin(createTodoRequestDto);
  }

  @ApiOperation({ summary: '[TODO] Todo 수정하기' })
  @ApiParam({
    name: 'id',
    description: 'todo의 id',
    required: true,
  })
  @ApiBody({
    description: '수정할 속성 optional 세팅, content | status ',
    type: UpdateTodoRequestDto,
  })
  @ApiOkResponse({
    type: Todo,
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

  @ApiOperation({ summary: '[TODO] Todo 삭제하기 - 로그인 없이 처리' })
  @ApiParam({
    name: 'id',
    description: 'todo의 id',
    required: true,
  })
  @Delete('/:id/without-login')
  async deleteTodoByIdWithoutLogin(@Param('id') id: number): Promise<void> {
    return await this.todoService.deleteTodoByIdWithoutLogin(id);
  }
}
