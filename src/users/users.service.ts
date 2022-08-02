import { User } from '@entity/domain/todo/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(private usersRepository: UsersRepository) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.getUserById(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update({ id }, updateUserDto);
  }

  async deleteUserById(id: number): Promise<void> {
    return this.usersRepository.deleteUserById(id);
  }
}
