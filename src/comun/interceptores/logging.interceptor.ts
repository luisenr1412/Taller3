import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Aspecto transversal encargado de loguear cada operación GraphQL
 * (query o mutation) ejecutada en el servidor, incluyendo su
 * nombre, argumentos recibidos y tiempo de ejecución.
 *
 * Al implementarse como interceptor, esta lógica queda completamente
 * desacoplada de los resolvers y servicios de negocio (Programación
 * Orientada a Aspectos).
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('GraphQL');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const args = gqlContext.getArgs();

    const operacion = info.fieldName;
    const tipo = info.operation.operation; // 'query' | 'mutation'
    const inicio = Date.now();

    this.logger.log(`→ [${tipo.toUpperCase()}] ${operacion} | args: ${JSON.stringify(args)}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const duracion = Date.now() - inicio;
          this.logger.log(`← [${tipo.toUpperCase()}] ${operacion} completado en ${duracion}ms`);
        },
        error: (err) => {
          const duracion = Date.now() - inicio;
          this.logger.error(
            `✗ [${tipo.toUpperCase()}] ${operacion} falló en ${duracion}ms | ${err.message}`,
          );
        },
      }),
    );
  }
}
