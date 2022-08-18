import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthJwtService } from './jwt/auth-jwt.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserRoleValidationPipe } from '@users/web/pipes/user-role-validation.pipe';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { User } from '@users/application/entity/user.entity';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입을 한다' })
  @Post('/signup')
  async signUn(
    @Body(ValidationPipe, UserRoleValidationPipe)
    signUpRequestDto: SignUpRequestDto,
  ): Promise<void> {
    return await this.authService.signUp(signUpRequestDto);
  }

  // JWT login
  @ApiOperation({ summary: 'jwt 로그인을 한다.' })
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) signInDto: SignInRequestDto,
    @GetUser() user: User,
  ): Promise<SignInResponseDto> {
    return await this.authService.signIn(signInDto);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('/signin')
  // login(@GetUser() user: User) {
  //   return user;
  // }
}
