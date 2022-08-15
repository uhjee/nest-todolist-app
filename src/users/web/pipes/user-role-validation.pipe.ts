import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRole } from '../../application/enum/UserRole';

export class UserRoleValidationPipe implements PipeTransform {
  readonly RoleOptions = Object.values(UserRole);

  private isRoleValid(role: any) {
    return this.RoleOptions.includes(role);
  }

  transform(value: any): any {
    const role = value.role.toUpperCase();

    if (!this.isRoleValid(role)) {
      throw new BadRequestException(
        `${role} 은 role options 에 포함되지 않습니다.`,
      );
    }
    return value;
  }
}
