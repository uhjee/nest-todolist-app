import { IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
