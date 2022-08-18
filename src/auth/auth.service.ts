import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { AuthJwtService } from './jwt/auth-jwt.service';
import bcrypt from 'bcryptjs';
import { UsersService } from '@users/application/users.service';
import { AuthLocalService } from './local/auth-local.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/application/entity/user.entity';
import { Repository } from 'typeorm';

export interface IAuthService {
  signIn(signInReqDto: SignInRequestDto): Promise<SignInResponseDto>;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthJwtService)
    private readonly authService: IAuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(signUpUserDto: SignUpRequestDto): Promise<void> {
    const { password } = signUpUserDto;
    // bcrypt 암호화 진행
    // 1. salt 생성
    const salt = await bcrypt.genSalt();
    // 2. salt + password Hash 처리
    signUpUserDto.password = await bcrypt.hash(password, salt);

    await this.userRepository.save(signUpUserDto);
  }

  async signIn(signInReqDto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInReqDto);
  }
}
