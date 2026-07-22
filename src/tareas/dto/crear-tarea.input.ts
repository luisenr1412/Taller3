import { InputType, Field } from '@nestjs/graphql';

/**
 * Datos requeridos para crear una nueva tarea.
 */
@InputType()
export class CrearTareaInput {
  @Field()
  titulo: string;

  @Field()
  descripcion: string;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  etiquetas?: string[];

  @Field()
  usuarioAsignado: string;

  @Field()
  proyecto: string;
}
