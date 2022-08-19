import { UpdateUserRequestDto } from '../web/request/update-user-request.dto';
import { SignUpRequestDto } from '../../auth/dto/sign-up.request.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserWithoutPasswordDto } from '@users/application/dto/user-without-password.dto';
import { Repository } from 'typeorm';
import { User } from '@users/application/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface UsersCommandService {
  /**
   * 유저를 생성한다. (회원가입)
   * @param signUpUserDto
   */
  createUser(signUpUserDto: SignUpRequestDto): Promise<void>;

  /**
   * 유저 정보를 수정한다.
   * @param id
   * @param updateUserDto
   */
  updateUser(
    id: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<UserWithoutPasswordDto>;

  /**
   * 유저 Id로 유저를 삭제한다.
   * @param id
   */
  deleteUserById(id: number): Promise<void>;
}

@Injectable()
export class UsersRDBCommandService implements UsersCommandService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(signUpUserDto: SignUpRequestDto): Promise<void> {
    const { name, email, password, role } = signUpUserDto;
    const user = {
      name,
      email,
      password,
      role,
    };

    await this.usersRepository.save(user);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<UserWithoutPasswordDto> {
    const { affected } = await this.usersRepository.update(
      { id },
      updateUserDto,
    );
    if (affected) {
      const { password, ...foundUserWithoutPassword } =
        await this.usersRepository.findOne({ where: { id } });
      return foundUserWithoutPassword;
    }
    throw new NotFoundException(`${id}를 수정하지 못하였습니다.`);
  }

  async deleteUserById(id: number): Promise<void> {
    const { affected } = await this.usersRepository.softDelete({ id });
    if (!affected)
      throw new NotFoundException(`${id}의 유저를 삭제하지 못했습니다.`);
  }
}
