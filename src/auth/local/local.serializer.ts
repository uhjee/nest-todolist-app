import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/application/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.userRepository
      .findOneOrFail({
        where: { id: +userId },
        select: ['id', 'email', 'name'],
      })
      .then((user) => {
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
