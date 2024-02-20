import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IErrorResult } from '../interface/iErrorResult';
import { ResponseMessage } from '../models/responseMessage';
import { QueryFailedError } from 'typeorm';

export class QueryFailedCustomError implements IErrorResult {
  validation(exception: unknown, ctx: HttpArgumentsHost,httpAdapter: any): ResponseMessage {
    if (exception instanceof QueryFailedError){
      return new ResponseMessage(
        409,
        new Date().toISOString(),
        httpAdapter.getRequestUrl(ctx.getRequest()),
        exception.message
      )
    }
    return null;
  }

}