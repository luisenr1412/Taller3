import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Tarea } from './entidades/tarea.entity';
import { TareasService } from './tareas.service';
import { CrearTareaInput } from './dto/crear-tarea.input';
import { ActualizarTareaInput } from './dto/actualizar-tarea.input';

@Resolver(() => Tarea)
export class TareasResolver {
  constructor(private readonly tareasService: TareasService) {}

  @Query(() => [Tarea], { name: 'tareas' })
  buscarTodas(): Promise<Tarea[]> {
    return this.tareasService.buscarTodas();
  }

  @Query(() => Tarea, { name: 'tarea' })
  buscarPorId(@Args('id', { type: () => ID }) id: string): Promise<Tarea> {
    return this.tareasService.buscarPorId(id);
  }

  @Mutation(() => Tarea, { name: 'crearTarea' })
  crear(@Args('datos') datos: CrearTareaInput): Promise<Tarea> {
    return this.tareasService.crear(datos);
  }

  @Mutation(() => Tarea, { name: 'actualizarTarea' })
  actualizar(@Args('datos') datos: ActualizarTareaInput): Promise<Tarea> {
    return this.tareasService.actualizar(datos);
  }

  @Mutation(() => Boolean, { name: 'eliminarTarea' })
  eliminar(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.tareasService.eliminar(id);
  }
}
