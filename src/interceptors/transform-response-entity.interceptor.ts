import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseEntity } from '@common/entity/res/response.entity';
import { filter, map, Observable, pipe } from 'rxjs';

@Injectable()
export class TransformResponseEntityInterceptor<T>
  implements NestInterceptor<T, ResponseEntity<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseEntity<T>> | Promise<Observable<ResponseEntity<T>>> {
    return next.handle().pipe(
      filter((data) => data !== null && data !== undefined),
      map((data) => ResponseEntity.OK_WITH(data)),
    );
  }
}
