import { ResponseMessage } from '../models/responseMessage';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export abstract class IErrorResult {
  abstract validation(exception: unknown, ctx: HttpArgumentsHost, httpAdapter: any): ResponseMessage;
}