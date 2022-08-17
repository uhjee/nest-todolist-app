import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { User } from '@users/application/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLocalService } from './auth-local.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authLocalService: AuthLocalService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string, done: CallableFunction) {
    const user = await this.authLocalService.validateUser(email, password);
    console.log('-> user', user);

    if (!user) {
      throw new UnauthorizedException(); // 401 exception
    }
    return done(null, user);
  }
}
