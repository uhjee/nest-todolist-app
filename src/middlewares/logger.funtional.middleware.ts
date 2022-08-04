import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function functionalLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = new Logger('HTTP-functional-middleware'); // Logger에 context 지정

  const { ip, method, originalUrl } = req;
  const userAgent = req.get('user-agent') || '';

  // 라우터보다 일찍 호출되기 때문에 event로 cb 미리 등록
  res.on('finish', () => {
    const { statusCode } = res;
    const contentLength = res.get('content-length');
    logger.log(
      `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
    );
  });

  next();
}
