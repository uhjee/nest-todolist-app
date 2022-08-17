import { Injectable } from '@nestjs/common';
import { IAuthService } from '../auth.service';
import { SignInRequestDto } from '../dto/sign-in.request.dto';
import { SignInResponseDto } from '../dto/sign-in.response.dto';
import { Repository } from 'typeorm';
import { User } from '@users/application/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthLocalService implements IAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  signIn(signInReqDto: SignInRequestDto): Promise<SignInResponseDto> {
    return Promise.resolve(undefined);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder()
      .select(['id', 'password', 'email', 'name'])
      .where('email = :email', { email })
      .getRawOne();
    console.log('-> user', user);

    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
