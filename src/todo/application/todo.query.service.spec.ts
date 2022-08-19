import { Test, TestingModule } from '@nestjs/testing';
import {
  TodoQueryService,
  TodoRDBQueryService,
} from '@todo/application/service/todo.query.service';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from '@users/application/users.module';

describe('TodoQeuryService', () => {
  let todoQueryService: TodoQueryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => UsersModule)],
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
