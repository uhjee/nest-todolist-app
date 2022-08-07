import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { IsNull, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SignUpUserDto } from '../auth/dto/sign-up.dto';
import { User } from '@entity/domain/user.entity';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async getAllUsers(): Promise<User[]> {
    return await this.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });
    if (!found)
      throw new NotFoundException(
        `${id}의 ID를 가진 User 를 찾을 수 없습니다.`,
      );

    return found;
  }

  async createUser(createUserDto: SignUpUserDto): Promise<void> {
    const { name, email, password, role } = createUserDto;
    const user = this.create({
      name,
      email,
      password,
      role,
    });

    await this.save(user);
  }

  async deleteUserById(id: number) {
    const { affected } = await this.softDelete({ id });
    if (!affected)
      throw new NotFoundException(`${id} id의 유저를 삭제하지 못했습니다.`);
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.findOne({
      where: {
        email,
        deletedAt: IsNull(),
      },
    });
    if (!found)
      throw new NotFoundException(
        `${email}의 email을 가진 User 를 찾을 수 없습니다.`,
      );

    return found;
  }
}
