import { UserRole } from '@entity/enum/UserRole';

export class UpdateUserDto {
  name: string;
  role: UserRole;
  password: string;
  email: string;
  isBlackUser: boolean;
}
