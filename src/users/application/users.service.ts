import { User } from './entity/user.entity';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { UpdateUserRequestDto } from '../web/request/update-user-request.dto';

import { UsersQueryService, UsersRDBQueryService } from './users.query.service';
import {
  UsersCommandService,
  UsersRDBCommandService,
} from './users.command.service';
import { GetUserDto } from './dto/get-user.dto';
import { SignUpRequestDto } from '../../auth/dto/sign-up.request.dto';

export interface UserAuthQueryService {
  findByUsernameAndPassword(): Promise<User>;
}

@Injectable()
export class UsersService implements UsersQueryService, UsersCommandService {
  private logger = new Logger('UsersService');

  constructor(
    @Inject(UsersRDBQueryService) private usersQueryService: UsersQueryService,
    @Inject(UsersRDBCommandService)
    private readonly usersCommandService: UsersCommandService,
  ) {}

  async getAllUsers(): Promise<GetUserDto[]> {
    return this.usersQueryService.getAllUsers();
  }

  async createUser(signUpUserDto: SignUpRequestDto): Promise<void> {
    await this.usersCommandService.createUser(signUpUserDto);
  }

  async getUserById(id: number): Promise<User> {
    return this.usersQueryService.getUserById(id);
  }

  async updateUser(
    id: number,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<void> {
    await this.usersCommandService.updateUser(id, updateUserRequestDto);
  }

  async deleteUserById(id: number): Promise<void> {
    await this.usersCommandService.deleteUserById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersQueryService.getUserByEmail(email);
  }
}
