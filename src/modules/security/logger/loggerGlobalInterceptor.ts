import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Payload } from '../../autenticacao/models/jwt/payload';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export interface RequisicaoComUsuario extends Request {
  usuario: Payload;
}

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {
  }

  intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp: HttpArgumentsHost = contexto.switchToHttp();

    const requisicao = contextoHttp.getRequest();
    return next.handle().pipe(
      tap(() => {
        if ('usuario' in requisicao) {
          this.logger.log(
            `Rota acessada pelo usuário: ${requisicao.usuario.id}`,
          );
        }
      }),
    );
  }
}