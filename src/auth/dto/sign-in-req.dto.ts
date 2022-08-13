import { IsNotEmpty } from 'class-validator';

export class SignInReqDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
