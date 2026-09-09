# Copilot Instructions

Siempre use Spec-Driven Development en este repository

Antes de hacer cambios, identifica la spec activa y lee en este orden:

- .specify/memory/constitution.md
- .specify/specs/<spec-activa>/spec.md
- .specify/specs/<spec-activa>/plan.md
- .specify/specs/<spec-activa>/tasks.md

Reglas:
- Considera los documentos `.specify` como la fuente de la verdad.
- No implementes funcionalidades que no estén descritas en `spec.md`.
- Sigue `plan.md` para la arquitectura y la secuenciación.
- Ejecuta el trabajo tarea por tarea, basándote en `tasks.md`.
- Trabaja solo sobre checks pendientes (`- [ ]`) y márcalos cuando se completen realmente.
- Si no hay tareas pendientes, no reimplementes: valida consistencia entre constitución, spec, plan, tasks y código existente.
- Después de cada cambio, explica qué tarea se completó y qué archivos se modificaron.
