import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInRequestDto } from 'src/auth/dto/sign-in.request.dto';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from '../dto/sign-in.response.dto';
import { IAuthService } from '../auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/application/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthJwtService implements IAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    const found = await this.userRepository.findOneBy({ email });

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
