import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@entity/domain/todo/user.entity';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async getAllUsers(): Promise<User[]> {
    const users = await this.find({
      where: {
        deletedAt: null,
      },
    });
    return users;
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role } = createUserDto;
    const user = this.create({
      name,
      email,
      password,
      role,
    });

    await this.save(user);
    return user;
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
}
