import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CrearTareaInput } from './crear-tarea.input';
import { EstadoTarea } from '../enums/estado-tarea.enum';

@InputType()
export class ActualizarTareaInput extends PartialType(CrearTareaInput) {
  @Field(() => ID)
  id: string;

  @Field(() => EstadoTarea, { nullable: true })
  estado?: EstadoTarea;
}
