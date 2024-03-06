import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IErrorResult } from '../interface/iErrorResult';
import { ResponseMessage } from '../models/responseMessage';
import { HttpException } from '@nestjs/common';

export class HttpExceptionError implements IErrorResult {
  validation(exception: unknown, ctx: HttpArgumentsHost, httpAdapter: any): ResponseMessage {
    if (exception instanceof HttpException) {
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