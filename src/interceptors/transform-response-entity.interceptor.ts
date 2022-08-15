import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseEntity } from '@common/entity/res/response.entity';
import { map, Observable } from 'rxjs';

/**
 * ResponseEntity로 wrapping하여 한다.
 * data가 있는 경우와 없는 경우에 따라 분기되어 반환한다.
 */

@Injectable()
export class TransformResponseEntityInterceptor<T>
  implements NestInterceptor<T, ResponseEntity<T | string>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ):
    | Observable<ResponseEntity<T | string>>
    | Promise<Observable<ResponseEntity<T | string>>> {
    return next
      .handle()
      .pipe(
        map((data) =>
          data ? ResponseEntity.OK_WITH(data) : ResponseEntity.OK(),
        ),
      );
  }
}
