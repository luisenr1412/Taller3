import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EstadoTarea } from '../enums/estado-tarea.enum';

/**
 * Entidad que representa una tarea de un proyecto de desarrollo de software.
 */
@ObjectType()
export class Tarea {
  /** Identificador único de la tarea */
  @Field(() => ID)
  id: string;

  /** Título breve de la tarea */
  @Field()
  titulo: string;

  /** Descripción detallada de la tarea */
  @Field()
  descripcion: string;

  /** Estado actual dentro del flujo de trabajo */
  @Field(() => EstadoTarea)
  estado: EstadoTarea;

  /** Conjunto de etiquetas asociadas a la tarea */
  @Field(() => [String])
  etiquetas: string[];

  /** Fecha de creación de la tarea */
  @Field()
  fechaCreacion: Date;

  /** Usuario responsable de la tarea */
  @Field()
  usuarioAsignado: string;

  /** Proyecto al que pertenece la tarea */
  @Field()
  proyecto: string;
}
