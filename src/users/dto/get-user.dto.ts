import { UserRole } from '@entity/enum/UserRole';

export class GetUserDto {
  name: string;
  role: UserRole;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isBlackUser: boolean;
}
