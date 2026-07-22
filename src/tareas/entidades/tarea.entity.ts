import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EstadoTarea } from '../enums/estado-tarea.enum';

@ObjectType()
export class Tarea {

  @Field(() => ID)
  id: string;

  @Field()
  titulo: string;

  @Field()
  descripcion: string;

  @Field(() => EstadoTarea)
  estado: EstadoTarea;

  @Field(() => [String])
  etiquetas: string[];

  @Field()
  fechaCreacion: Date;

  @Field()
  usuarioAsignado: string;

  @Field()
  proyecto: string;
}
