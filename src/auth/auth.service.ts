import {
  forwardRef,
  Inject,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { SignUpUserDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';
import { Response } from 'supertest';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) // 순환 참조 문제 해결을 위해 forwardRef 사용
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto): Promise<void> {
    const { password } = signUpUserDto;
    // bcrypt 암호화 진행
    // 1. salt 생성
    const salt = await bcrypt.genSalt();
    // 2. salt + password Hash 처리
    signUpUserDto.password = await bcrypt.hash(password, salt);

    await this.usersService.createUser(signUpUserDto);
  }

  /**
   * 로그인을 진행한다.
   *
   * @param signInDto
   * @param res
   */
  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { password, email } = signInDto;

    const found = await this.usersService.getUserByEmail(email);

    if (found && (await bcrypt.compare(password, found.password))) {
      const accessToken = await this.jwtService.sign({ email });
      return { accessToken };
      throw new UnauthorizedException('login failed');
    }
  }
}
