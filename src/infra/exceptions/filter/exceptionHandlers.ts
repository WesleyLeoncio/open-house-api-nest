import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus, ConsoleLogger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

//TODO REFATORAR / TENTAR APLICAR PADRÃO DE PROJETO / TRATAR OS ERROS DO CLASS VALIDATOR
@Catch()
export class ExceptionHandlers implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerNativo: ConsoleLogger
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.loggerNativo.error(exception);
    console.log(exception)

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const httpMensagem: string = exception instanceof HttpException
      ? exception.message : 'INTERNAL SERVER ERROR';


    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: httpMensagem
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

}