import { TodoStatus } from '../../application/enum/TodoStatus';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';

@Injectable()
export class TodoStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = Object.values(TodoStatus);

  transform(value: any, metadata: ArgumentMetadata) {
    const status = value.status;
    if (status) {
      if (!this.isStatusValid(status)) {
        throw new BadRequestException(`${status}는 Todo의 상태가 아닙니다.`);
      }
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.StatusOptions.includes(status);
  }
}
