import { GetUserDto } from './dto/get-user.dto';
import { User } from './entity/user.entity';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';

export interface UsersQueryService {
  getAllUsers(): Promise<GetUserDto[]>;

  getUserById(id: number): Promise<User>;

  getUserByEmail(email: string): Promise<User>;
}

@Injectable()
export class UsersRDBQueryService implements UsersQueryService {
  constructor(private usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<GetUserDto[]> {
    return await this.usersRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.getUserByEmail(email);
  }
}
