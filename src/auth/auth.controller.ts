import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserRoleValidationPipe } from '@users/web/pipes/user-role-validation.pipe';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { ResponseEntity } from '@common/entity/res/response.entity';
import { ResponseStatus } from '@common/entity/res/response.status.enum';
import { User } from '@users/application/entity/user.entity';
import { SignUpRequestDto } from './dto/sign-up.request.dto';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입을 한다' })
  @Post('/signup')
  async signUn(
    @Body(ValidationPipe, UserRoleValidationPipe)
    signUpRequestDto: SignUpRequestDto,
  ): Promise<ResponseEntity<string>> {
    await this.authService.signUp(signUpRequestDto);
    return ResponseEntity.OK();
  }

  @ApiOperation({ summary: '로그인을 한다.' })
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) signInDto: SignInRequestDto,
    @GetUser() user: User,
  ): Promise<SignInResponseDto> {
    return await this.authService.signIn(signInDto);
  }
}
