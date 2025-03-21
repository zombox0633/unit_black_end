import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (
      typeof exception === 'object' &&
      exception !== null &&
      'RespCode' in exception &&
      'RespMessage' in exception
    ) {
      const { RespCode, RespMessage } = exception as {
        RespCode: number;
        RespMessage: string;
      };
      response.status(RespCode).json({ RespCode, RespMessage, Result: null });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response.status(status).json({
        RespCode: status,
        RespMessage:
          typeof exceptionResponse === 'object' &&
          exceptionResponse !== null &&
          'message' in exceptionResponse
            ? (exceptionResponse as { message: string }).message
            : 'error',
        Result: null,
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      RespCode: HttpStatus.INTERNAL_SERVER_ERROR,
      RespMessage: 'Internal server error 😿',
      Result: null,
    });
  }
}
