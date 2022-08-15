import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInRequestDto } from 'src/auth/dto/sign-in.request.dto';
import { UsersService } from '@users/application/users.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { SignUpRequestDto } from './dto/sign-up.request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) // 순환 참조 문제 해결을 위해 forwardRef 사용
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

  /**
   * 로그인을 진행한다.
   *
   * @param signInReqDto
   * @param res
   */
  async signIn(signInReqDto: SignInRequestDto): Promise<SignInResponseDto> {
    const { password, email } = signInReqDto;

    const found = await this.usersService.getUserByEmail(email);

    if (found && (await bcrypt.compare(password, found.password))) {
      const accessToken = this.jwtService.sign({ email });
      delete found.password;
      return { ...found, accessToken };
    }
    throw new UnauthorizedException('login failed');
  }
}
