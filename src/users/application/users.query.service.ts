import { UserWithoutPasswordDto } from './dto/user-without-password.dto';
import { User } from './entity/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

export interface UsersQueryService {
  /**
   * 모든 유저 목록을 조회한다.
   */
  getAllUsers(): Promise<UserWithoutPasswordDto[]>;

  /**
   * 유저의 Id로 유저를 조회한다.
   * @param id
   */
  getUserById(id: number): Promise<User>;

  /**
   * 유저의 이메일로 유저를 조회한다.
   * @param email
   */
  getUserByEmail(email: string): Promise<User>;
}

@Injectable()
export class UsersRDBQueryService implements UsersQueryService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<UserWithoutPasswordDto[]> {
    return await this.usersRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!found)
      throw new NotFoundException(
        `${id}의 ID를 가진 User 를 찾을 수 없습니다.`,
      );

    return found;
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.usersRepository.findOne({
      select: ['email', 'password', 'name', 'id', 'role', 'isBlackUser'],
      where: {
        email,
      },
    });
    if (!found)
      throw new NotFoundException(
        `${email}의 email을 가진 User 를 찾을 수 없습니다.`,
      );

    return found;
  }
}
