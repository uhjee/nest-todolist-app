import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('Logging Time');

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    this.logger.log(`Before...[${className} > ${handlerName}]`);
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `After...[${className} > ${handlerName}] ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
