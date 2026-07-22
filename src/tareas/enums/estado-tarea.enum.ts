import { registerEnumType } from '@nestjs/graphql';

/**
 * Representa los posibles estados de una tarea dentro del flujo de trabajo del proyecto.
 */
export enum EstadoTarea {
  BACKLOG = 'BACKLOG',
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

registerEnumType(EstadoTarea, {
  name: 'EstadoTarea',
  description: 'Estados posibles de una tarea',
});
