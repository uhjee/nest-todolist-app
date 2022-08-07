import { PassportStrategy } from '@nestjs/passport';
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@entity/domain/user.entity';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UsersRepository))
    private usersRepository: UsersRepository,
  ) {
    // 상속 받은 PassportStrategy의 옵션 세팅 - 중요
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'), // 인가할 때 사용할 Secret Text
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 인가를 위한 jwt가 어디서 오는지 알려주도록 세팅
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user: User = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}