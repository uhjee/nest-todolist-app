import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserRoleValidationPipe } from '../users/pipes/user-role-validation.pipe';
import { SignUpUserDto } from './dto/sign-up.dto';
import { ResponseEntity } from '@entity/common/res/response.entity';
import { ResponseStatus } from '@entity/common/res/response.status.enum';
import { SignInDto } from './dto/sign-in.dto';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입을 한다' })
  @Post('/signup')
  async signUn(
    @Body(ValidationPipe, UserRoleValidationPipe) signUpUserDto: SignUpUserDto,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.authService.signUp(signUpUserDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR_WITH(
        error.message,
        error.code === 'ER_DUP_ENTRY' // column 중복 error code
          ? ResponseStatus.BAD_PARAMETER
          : ResponseStatus.SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: '로그인을 한다.' })
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ accessToken: string } | ResponseEntity<string>> {
    try {
      return await this.authService.signIn(signInDto);
    } catch (error) {
      return ResponseEntity.ERROR_WITH(
        error.message,
        ResponseStatus.SERVER_ERROR,
      );
    }
  }
}
