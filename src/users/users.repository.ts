import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { SignUpUserDto } from '../auth/dto/sign-up.dto';
import { User } from '@entity/domain/user.entity';
import { GetUserDto } from './dto/get-user.dto';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async getAllUsers(): Promise<User[]> {
    const foundUserList = await this.find({
      where: {
        deletedAt: null,
      },
    });

    // foundUserList.forEach((user) => {
    //   delete user.password;
    // });
    return foundUserList;
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.findOne({
      where: {
        id,
        deletedAt: null,
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
    // const found = await this.findOneBy({ id, deletedAt: null });
    // if (!found)
    //   throw new NotFoundException(
    //     `${id}의 ID를 가진 User 를 찾을 수 없습니다.`,
    //   );
    // found.deletedAt = LocalDateTime.now();
    // await this.save(found);
    await this.softDelete({ id });
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.findOne({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (!found)
      throw new NotFoundException(
        `${email}의 email을 가진 User 를 찾을 수 없습니다.`,
      );

    return found;
  }
}
