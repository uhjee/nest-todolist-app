import { UpdateUserRequestDto } from '../web/request/update-user-request.dto';
import { UsersRepository } from './users.repository';
import { SignUpRequestDto } from '../../auth/dto/sign-up.request.dto';
import { Injectable } from '@nestjs/common';
import { GetUserDto } from '@users/application/dto/get-user.dto';

export interface UsersCommandService {
  createUser(signUpUserDto: SignUpRequestDto): Promise<void>;

  updateUser(
    id: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<GetUserDto>;

  deleteUserById(id: number): Promise<void>;
}

@Injectable()
export class UsersRDBCommandService implements UsersCommandService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(signUpUserDto: SignUpRequestDto): Promise<void> {
    await this.usersRepository.createUser(signUpUserDto);
  }

  async deleteUserById(id: number): Promise<void> {
    await this.usersRepository.deleteUserById(id);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<GetUserDto> {
    return await this.usersRepository.updateUser(id, updateUserDto);
  }
}
