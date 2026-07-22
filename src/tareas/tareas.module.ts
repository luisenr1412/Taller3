import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasResolver } from './tareas.resolver';

@Module({
  providers: [TareasResolver, TareasService],
})
export class TareasModule {}
