import { UserRole } from '@entity/enum/UserRole';

export class CreateUserDto {
  name: string;
  password: string;
  role: UserRole;
  email: string;
}
