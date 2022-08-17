import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { AuthJwtService } from './jwt/auth-jwt.service';
import bcrypt from 'bcryptjs';
import { UsersService } from '@users/application/users.service';
import { AuthLocalService } from './local/auth-local.service';

export interface IAuthService {
  signIn(signInReqDto: SignInRequestDto): Promise<SignInResponseDto>;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthLocalService)
    private readonly authService: IAuthService,
    @Inject(forwardRef(() => UsersService)) // 순환 참조 문제 해결을 위해 forwardRef 사용
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpUserDto: SignUpRequestDto): Promise<void> {
    const { password } = signUpUserDto;
    // bcrypt 암호화 진행
    // 1. salt 생성
    const salt = await bcrypt.genSalt();
    // 2. salt + password Hash 처리
    signUpUserDto.password = await bcrypt.hash(password, salt);

    await this.usersService.createUser(signUpUserDto);
  }

  async signIn(signInReqDto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInReqDto);
  }
}
