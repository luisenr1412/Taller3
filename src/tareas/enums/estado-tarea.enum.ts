import { registerEnumType } from '@nestjs/graphql';

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
