## Instalación

\`\`\`bash
npm install
\`\`\`

## Ejecución

\`\`\`bash
npm run start:dev
\`\`\`

El servidor levanta en `http://localhost:3000/graphql`, donde se puede acceder al playground de Apollo para probar las queries y mutations.

## Modelo de datos: Tarea

| Campo | Tipo | Descripción |
|---|---|---|
| id | ID | Identificador único |
| titulo | String | Título de la tarea |
| descripcion | String | Descripción detallada |
| estado | EstadoTarea | BACKLOG, TO_DO, IN_PROGRESS, DONE |
| etiquetas | [String] | Etiquetas asociadas |
| fechaCreacion | Date | Fecha de creación |
| usuarioAsignado | String | Usuario responsable |
| proyecto | String | Proyecto al que pertenece |

## Operaciones disponibles

### Queries
- `tareas`: lista todas las tareas
- `tarea(id)`: obtiene una tarea por id

### Mutations
- `crearTarea(datos)`: crea una nueva tarea
- `actualizarTarea(datos)`: actualiza estado, etiquetas, usuario u otros campos
- `eliminarTarea(id)`: elimina una tarea por id

## Autor(es)

- Luis Chavero
- Diego Mirabal