import { UpdateUserRequestDto } from '../web/request/update-user-request.dto';
import { UsersRepository } from './users.repository';
import { SignUpRequestDto } from '../../auth/dto/sign-up.request.dto';

export interface UsersCommandService {
  createUser(signUpUserDto: SignUpRequestDto): Promise<void>;

  updateUser(id: number, updateUserDto: UpdateUserRequestDto): Promise<void>;

  deleteUserById(id: number): Promise<void>;
}

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
  ): Promise<void> {
    await this.usersRepository.update({ id }, updateUserDto);
  }
}
