import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConsoleLogger, HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { HttpExceptionError } from '../validations/httpExceptionError';
import { ValidationPiperError } from '../validations/validationPiperError';
import { ResponseMessage } from '../models/responseMessage';
import { ValidationStrategy } from '../strategy/validationStrategy';
import { QueryFailedCustomError } from '../validations/queryFailedCustomError';


//TODO REFATORAR / TENTAR APLICAR PADRÃO DE PROJETO / TRATAR OS ERROS DO CLASS VALIDATOR
@Catch()
export class ExceptionHandlers implements ExceptionFilter {

  private strategy = new ValidationStrategy(
    [
      new HttpExceptionError(),
      new ValidationPiperError(),
      new QueryFailedCustomError()
    ],
  );

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerNativo: ConsoleLogger,
  ) {
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    this.loggerNativo.error(exception);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx: HttpArgumentsHost = host.switchToHttp();

    let responseBody: ResponseMessage = this.strategy.verificarErros(exception, ctx, httpAdapter);

    if (!responseBody) {
      responseBody = new ResponseMessage(
        HttpStatus.INTERNAL_SERVER_ERROR,
        new Date().toISOString(),
        httpAdapter.getRequestUrl(ctx.getRequest()),
        'INTERNAL SERVER ERROR',
      );
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }

}