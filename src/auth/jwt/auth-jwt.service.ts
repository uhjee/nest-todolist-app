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
import { SignInResponseDto } from '../dto/sign-in.response.dto';
import { IAuthService } from '../auth.service';

@Injectable()
export class AuthJwtService implements IAuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) // 순환 참조 문제 해결을 위해 forwardRef 사용
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 로그인을 진행한다.
   *
   * @param signInReqDto
   * @param res
   */
  async signIn(signInReqDto: SignInRequestDto): Promise<SignInResponseDto> {
    const { password, email } = signInReqDto;

    const found = await this.usersService.getUserByEmail(email);

    // 비밀번호 검증
    if (found && (await bcrypt.compare(password, found.password))) {
      // 토큰 발행
      const accessToken = this.jwtService.sign({ email });
      delete found.password;
      return { ...found, accessToken };
    }
    throw new UnauthorizedException('login failed');
  }
}
