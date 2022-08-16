import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseEntity } from '@common/entity/res/response.entity';
import { ResponseStatus } from '@common/entity/res/response.status.enum';

export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HttpExceptionFilter');

  catch(exception: any, host: ArgumentsHost): any {
    this.logger.log('-> exception', exception.toString());

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // SQL Exception
    if (exception.sqlMessage && exception.code) {
      return response
        .status(500)
        .json(
          ResponseEntity.ERROR_WITH(
            exception.sqlMessage,
            ResponseStatus.SERVER_ERROR,
          ),
        );
    }

    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] }; //class-validator typing
    let message = '';
    if (err.message) {
      message = exception.response?.message;
    }

    // TODO: err 상태에 따라서 분기 처리 필요
    let responseStatus = ResponseStatus.SERVER_ERROR;
    if (exception.status?.toString()[0] === '4') {
      responseStatus = ResponseStatus.BAD_PARAMETER;
    }

    const status = exception.getStatus();
    response
      .status(status)
      .json(ResponseEntity.ERROR_WITH(message, responseStatus));
  }
}
