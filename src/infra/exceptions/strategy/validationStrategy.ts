import { IErrorResult } from '../interface/iErrorResult';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ResponseMessage } from '../models/responseMessage';

export class ValidationStrategy {
  validadores: IErrorResult[];

  constructor(valiadores: IErrorResult[]) {
    this.validadores = valiadores;
  }

  public verificarErros(exception: unknown, ctx: HttpArgumentsHost, httpAdapter: any): ResponseMessage {
    for (const erro of this.validadores) {
      const response: ResponseMessage = erro.validation(exception, ctx, httpAdapter);
      if (response) {
        return response;
      }
    }
    return null;
  }
}