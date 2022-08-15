import { UserRole } from '../../application/enum/UserRole';
import { PartialType } from '@nestjs/swagger';
import { User } from '../../application/entity/user.entity';

export class UpdateUserRequestDto extends PartialType(User) {}

// export class UpdateUserRequestDto {
//   name: string;
//   role: UserRole;
//   password: string;
//   email: string;
//   isBlackUser: boolean;
// }
