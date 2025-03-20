import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          const status = error.getStatus();
          const response = error.getResponse();

          return throwError(() => ({
            RespCode: status,
            RespMessage:
              typeof response === 'object' &&
              response !== null &&
              'message' in response
                ? (response as { message: string }).message
                : 'error',
            Result: null,
          }));
        }

        return throwError(() => ({
          RespCode: HttpStatus.INTERNAL_SERVER_ERROR,
          RespMessage: 'Internal server error 😿',
          Result: null,
        }));
      }),
    );
  }
}
