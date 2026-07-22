import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { Tarea } from './entidades/tarea.entity';
import { CrearTareaInput } from './dto/crear-tarea.input';
import { ActualizarTareaInput } from './dto/actualizar-tarea.input';
import { EstadoTarea } from './enums/estado-tarea.enum';

const RUTA_DB = join(process.cwd(), 'database.json');

interface BaseDeDatos {
  tareas: Tarea[];
}

@Injectable()
export class TareasService {
  private readonly logger = new Logger(TareasService.name);

  private async leerDb(): Promise<BaseDeDatos> {
    const contenido = await readFile(RUTA_DB, 'utf-8');
    return JSON.parse(contenido) as BaseDeDatos;
  }

  private async escribirDb(data: BaseDeDatos): Promise<void> {
    await writeFile(RUTA_DB, JSON.stringify(data, null, 2), 'utf-8');
  }

  async buscarTodas(): Promise<Tarea[]> {
    const db = await this.leerDb();
    return db.tareas;
  }

  async buscarPorId(id: string): Promise<Tarea> {
    const db = await this.leerDb();
    const tarea = db.tareas.find((t) => t.id === id);
    if (!tarea) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    return tarea;
  }

  async crear(datos: CrearTareaInput): Promise<Tarea> {
    const db = await this.leerDb();

    const nuevaTarea: Tarea = {
      id: randomUUID(),
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      estado: EstadoTarea.BACKLOG,
      etiquetas: datos.etiquetas ?? [],
      fechaCreacion: new Date(),
      usuarioAsignado: datos.usuarioAsignado,
      proyecto: datos.proyecto,
    };

    db.tareas.push(nuevaTarea);
    await this.escribirDb(db);

    this.logger.log(`Tarea creada: ${nuevaTarea.id}`);
    return nuevaTarea;
  }

  async actualizar(datos: ActualizarTareaInput): Promise<Tarea> {
    const db = await this.leerDb();
    const indice = db.tareas.findIndex((t) => t.id === datos.id);

    if (indice === -1) {
      throw new NotFoundException(`Tarea con id ${datos.id} no encontrada`);
    }

    db.tareas[indice] = {
      ...db.tareas[indice],
      ...datos,
    };

    await this.escribirDb(db);

    this.logger.log(`Tarea actualizada: ${datos.id}`);
    return db.tareas[indice];
  }

  async eliminar(id: string): Promise<boolean> {
    const db = await this.leerDb();
    const indice = db.tareas.findIndex((t) => t.id === id);

    if (indice === -1) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }

    db.tareas.splice(indice, 1);
    await this.escribirDb(db);

    this.logger.log(`Tarea eliminada: ${id}`);
    return true;
  }
}
