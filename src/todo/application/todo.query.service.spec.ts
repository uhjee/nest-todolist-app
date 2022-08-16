import { Test, TestingModule } from '@nestjs/testing';
import {
  TodoQueryService,
  TodoRDBQueryService,
} from '@todo/application/todo.query.service';
import { TypeOrmExModule } from '../../db/typeorm-ex.module';
import { TodoRepository } from '@todo/application/todo.repository';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from '@users/application/users.module';

describe('TodoQeuryService', () => {
  let todoQueryService: TodoQueryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmExModule.forCustomRepository([TodoRepository]),
        forwardRef(() => UsersModule),
      ],
      providers: [TodoRDBQueryService],
    }).compile();

    todoQueryService = moduleRef.get<TodoRDBQueryService>(TodoRDBQueryService);
  });

  it('should get Array of Todo', async () => {
    // const result = ['test'];
    // jest
    //   .spyOn(todoQueryService, 'getAllTodos')
    //   .mockImplementation(() => result);
    expect(await todoQueryService.getAllTodos()).toBe([]);
  });
});
