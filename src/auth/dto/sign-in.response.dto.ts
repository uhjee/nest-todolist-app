import { UserRole } from '@users/application/enum/UserRole';

export class SignInResponseDto {
  name: string;
  role: UserRole;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isBlackUser: boolean;
  accessToken: string;
}
