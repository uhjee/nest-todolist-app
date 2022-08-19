import { OmitType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class UserWithoutPasswordDto extends OmitType(User, [
  'password',
] as const) {}
