import { UserRole } from '@entity/enum/UserRole';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(40)
  password: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'email 형식이 유효하지 않습니다.',
  })
  email: string;

  role: UserRole;
}
