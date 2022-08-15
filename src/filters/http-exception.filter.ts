import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseEntity } from '@common/entity/res/response.entity';
import { ResponseStatus } from '@common/entity/res/response.status.enum';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.log('-> exception', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
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

    response
      .status(status)
      .json(ResponseEntity.ERROR_WITH(message, responseStatus));
  }
}
