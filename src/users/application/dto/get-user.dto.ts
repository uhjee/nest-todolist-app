import { OmitType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class GetUserDto extends OmitType(User, ['password'] as const) {
  // name: string;
  // role: UserRole;
  // email: string;
  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
  // isBlackUser: boolean;
}
