import { User } from '@entity/domain/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { SignUpUserDto } from '../auth/dto/sign-up.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(private usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<GetUserDto[]> {
    return await this.usersRepository.getAllUsers();
  }

  async createUser(signUpUserDto: SignUpUserDto): Promise<void> {
    await this.usersRepository.createUser(signUpUserDto);
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

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.getUserByEmail(email);
  }
}
