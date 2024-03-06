import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IErrorResult } from '../interface/iErrorResult';
import { ResponseMessage } from '../models/responseMessage';
import { ValidationExeption } from '../ValidationExeption';


export class ValidationPiperError implements IErrorResult {

  validation(exception: unknown, ctx: HttpArgumentsHost, httpAdapter: any): ResponseMessage {
    if (exception instanceof ValidationExeption) {
      return new ResponseMessage(
        exception.getStatus(),
        new Date().toISOString(),
        httpAdapter.getRequestUrl(ctx.getRequest()),
        exception.message,
      );
    }
    return null;
  }

}