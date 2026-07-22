import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Tarea } from './entidades/tarea.entity';
import { TareasService } from './tareas.service';
import { CrearTareaInput } from './dto/crear-tarea.input';
import { ActualizarTareaInput } from './dto/actualizar-tarea.input';

/**
 * Resolver GraphQL que expone las operaciones CRUD sobre las tareas.
 */
@Resolver(() => Tarea)
export class TareasResolver {
  constructor(private readonly tareasService: TareasService) {}

  /** Obtiene todas las tareas registradas. */
  @Query(() => [Tarea], { name: 'tareas' })
  buscarTodas(): Promise<Tarea[]> {
    return this.tareasService.buscarTodas();
  }

  /** Obtiene una tarea específica por su id. */
  @Query(() => Tarea, { name: 'tarea' })
  buscarPorId(@Args('id', { type: () => ID }) id: string): Promise<Tarea> {
    return this.tareasService.buscarPorId(id);
  }

  /** Crea una nueva tarea. */
  @Mutation(() => Tarea, { name: 'crearTarea' })
  crear(@Args('datos') datos: CrearTareaInput): Promise<Tarea> {
    return this.tareasService.crear(datos);
  }

  /** Actualiza una tarea existente (estado, etiquetas, usuario, etc.). */
  @Mutation(() => Tarea, { name: 'actualizarTarea' })
  actualizar(@Args('datos') datos: ActualizarTareaInput): Promise<Tarea> {
    return this.tareasService.actualizar(datos);
  }

  /** Elimina una tarea por su id. */
  @Mutation(() => Boolean, { name: 'eliminarTarea' })
  eliminar(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.tareasService.eliminar(id);
  }
}
