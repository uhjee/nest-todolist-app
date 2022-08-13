import { GetUserDto } from '../../users/dto/get-user.dto';
import { UserRole } from '@entity/enum/UserRole';

export class SignInResDto {
  name: string;
  role: UserRole;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isBlackUser: boolean;
  accessToken: string;
}
