# AGENTS.md — Guia del agente para el repositorio `RentManagerSDD`

## Resumen del proyecto

Aplicacion web de gestion de renta de propiedades construida con HTML, CSS y JavaScript vanilla.
Permite registrar propiedades, inquilinos y contratos de renta con persistencia local en el navegador.
No requiere servidor ni proceso de build: se abre directamente desde `app/index.html` con `file://`.

---

## Stack y restricciones tecnicas

| Categoria         | Detalle                                                        |
|-------------------|----------------------------------------------------------------|
| Lenguajes         | HTML, CSS y JavaScript vanilla. Sin frameworks ni librerias.  |
| Persistencia      | localStorage del navegador unicamente.                         |
| Modulos JS        | IIFE. Sin `import`/`export` ESM. API publica en `window.RentManagerSDDXxx`. |
| Prohibido         | React, Vue, jQuery, TypeScript, npm/yarn/pnpm, backend, preprocesadores CSS. |
| Sin build         | No existe `package.json`. La app se abre como archivo HTML.    |
| Estilos           | BEM relajado. Tokens centralizados en `styles.css`.            |
| Iconografia       | SVG outline en `ui.js`. Sin emojis ni Unicode como iconos.     |
| Imagenes          | `https://picsum.photos/seed/<id>/800/500` con fallback visual. |

---

## Estructura de carpetas vigente

```
RentManagerSDD/
  AGENTS.md                        <-- este archivo
  .github/
    copilot-instructions.md        <-- reglas del agente Copilot
    prompts/
      execute-spec.prompt.md       <-- prompt para ejecutar specs
      sync-agent.prompt.md         <-- prompt para sincronizar AGENTS.md
  .specify/
    memory/
      constitution.md              <-- fuente de verdad superior (reglas inmutables)
    specs/
      001-create-foundation/
        spec.md                    <-- criterios de aceptacion de la spec activa
        plan.md                    <-- decisiones de arquitectura e implementacion
        tasks.md                   <-- lista de tareas con estado de completitud
  app/
    index.html                     <-- punto de entrada de la aplicacion
    css/
      styles.css                   <-- tokens y componentes visuales globales
    js/
      app.js                       <-- bootstrap, routing entre paginas
      storage.js                   <-- unica capa de acceso a localStorage
      ui.js                        <-- render reutilizable (sidebar, cards, badges, etc.)
      properties.js                <-- dominio de propiedades: CRUD y validaciones
      tenants.js                   <-- dominio de inquilinos: CRUD y validaciones
      rentals.js                   <-- dominio de rentas: registro y estados
    pages/
      properties.html              <-- listado de propiedades
      add-property.html            <-- formulario alta de propiedad
      edit-property.html           <-- formulario edicion de propiedad
      rent-property.html           <-- formulario registro de renta
      tenants.html                 <-- listado de inquilinos
      add-tenant.html              <-- formulario alta de inquilino
      edit-tenant.html             <-- formulario edicion de inquilino
```

---

## Modulos clave y responsabilidades

| Modulo          | Responsabilidad                                                         |
|-----------------|-------------------------------------------------------------------------|
| `app.js`        | Bootstrap, inicializacion y routing entre paginas.                      |
| `storage.js`    | Unica capa autorizada para leer/escribir localStorage. Seed y flash.    |
| `ui.js`         | Render reutilizable: navbar, cards, badges, alertas, formularios.       |
| `properties.js` | Dominio de propiedades: CRUD, validaciones y puntos de extension.       |
| `tenants.js`    | Dominio de inquilinos: CRUD, validaciones y puntos de extension.        |
| `rentals.js`    | Dominio de rentas: registro de contratos y consistencia de estados.     |

### Claves de localStorage (namespaced)

- `RentManagerSDD.properties`
- `RentManagerSDD.tenants`
- `RentManagerSDD.rentals`
- `RentManagerSDD.flash`  (mensajes entre paginas)

### Entidades de dominio

**Propiedad:** `id`, `title`, `address`, `price`, `description`, `status`, `bedrooms`, `bathrooms`, `image`, `createdAt`, `updatedAt`

**Inquilino:** `id`, `name`, `email`, `phone`, `documentId`, `notes`, `createdAt`, `updatedAt`

**Renta:** `id`, `propertyId`, `tenantId`, `startDate`, `endDate`, `rentAmount`, `contractStatus`, `createdAt`

Estados de propiedad: `disponible` | `rentada` | `en mantenimiento`

Estados de contrato: `activo` | `pendiente` | `finalizado`

---

## Flujos operativos del agente

### Como contribuir

1. Leer `.specify/memory/constitution.md` antes de cualquier cambio.
2. Identificar la spec activa en `.specify/specs/` (directorio con el numero mas alto).
3. Leer `spec.md`, `plan.md` y `tasks.md` de la spec activa en ese orden.
4. Trabajar solo sobre checks pendientes (`- [ ]`) en `tasks.md`.
5. Marcar cada tarea como completada (`- [x]`) solo cuando este realmente implementada.
6. Despues de cada cambio: reportar que tarea se completo y que archivos se modificaron.

### Como validar cambios

- Abrir `app/index.html` directamente en el navegador (sin servidor).
- Verificar que no se usan `import`/`export`, frameworks ni npm.
- Confirmar que localStorage es accedido exclusivamente a traves de `storage.js`.
- Comprobar que cada modulo JS expone su API en `window.RentManagerSDDXxx`.
- Validar que las claves de localStorage usen el prefijo `RentManagerSDD.`.

### Como mantener consistencia

- La constitucion tiene prioridad sobre cualquier spec, plan o tarea.
- No implementar funcionalidades no descritas en `spec.md`.
- No redefinir en el plan restricciones normativas: referenciar la constitucion.
- Si no hay tareas pendientes: validar consistencia entre constitucion, spec, plan, tasks y codigo.

---

## Reglas de Spec-Driven Development

1. **Fuente de verdad:** `.specify/memory/constitution.md` es la autoridad maxima.
2. **Antes de implementar:** leer la spec activa completa (spec.md > plan.md > tasks.md).
3. **Solo lo especificado:** no agregar funcionalidades que no esten en `spec.md`.
4. **Tarea por tarea:** ejecutar una tarea a la vez siguiendo el orden de `tasks.md`.
5. **Marcar al completar:** solo poner `[x]` cuando el criterio este realmente cumplido.
6. **Sin reimplementacion innecesaria:** si no hay tareas pendientes, validar; no reescribir.
7. **Reporte obligatorio:** despues de cada cambio indicar tarea completada y archivos afectados.

---

## Archivos criticos y su proposito

| Archivo                                      | Proposito                                      |
|----------------------------------------------|------------------------------------------------|
| `.specify/memory/constitution.md`            | Reglas inmutables del proyecto (fuente maxima) |
| `.specify/specs/001-create-foundation/spec.md`  | Criterios de aceptacion de la fundacion        |
| `.specify/specs/001-create-foundation/plan.md`  | Decisiones de arquitectura e implementacion    |
| `.specify/specs/001-create-foundation/tasks.md` | Lista de tareas con estado de completitud      |
| `.github/copilot-instructions.md`            | Reglas de comportamiento del agente Copilot    |
| `.github/prompts/execute-spec.prompt.md`     | Prompt para ejecutar specs pendientes          |
| `.github/prompts/sync-agent.prompt.md`       | Prompt para sincronizar este archivo           |
| `app/index.html`                             | Punto de entrada de la aplicacion              |
| `app/js/storage.js`                          | Unica capa de acceso a localStorage            |
| `app/js/app.js`                              | Bootstrap y routing entre paginas              |
| `app/css/styles.css`                         | Tokens visuales y componentes globales         |

---

## Estado actual de la spec activa

**Spec:** `001-create-foundation` — Estado: `implemented`

Todas las tareas de `tasks.md` estan marcadas como completadas (`[x]`).
No hay tareas pendientes. La fundacion del proyecto esta implementada.

Proxima accion: si se crea una nueva spec, leer su `spec.md`, `plan.md` y `tasks.md` antes de implementar.

---

## Ultima sincronizacion

**Fecha:** 2026-05-07

**Cambios detectados:**
- `AGENTS.md` no existia: creado desde cero.
- Spec activa: `001-create-foundation` con estado `implemented` y todas las tareas completadas.
- Estructura `/app` completa y alineada con la constitucion: 7 paginas HTML, 6 modulos JS, 1 CSS.
- Carpetas `.github/prompts/` con 2 prompts operativos (`execute-spec`, `sync-agent`).
- Sin specs adicionales ni tareas pendientes detectadas.

**Archivos considerados:**
- `.github/copilot-instructions.md`
- `.specify/memory/constitution.md`
- `.specify/specs/001-create-foundation/spec.md`
- `.specify/specs/001-create-foundation/plan.md`
- `.specify/specs/001-create-foundation/tasks.md`
- `app/index.html`, `app/css/styles.css`
- `app/js/` (app.js, storage.js, ui.js, properties.js, tenants.js, rentals.js)
- `app/pages/` (7 archivos HTML)
- `.github/prompts/execute-spec.prompt.md`
- `.github/prompts/sync-agent.prompt.md`
