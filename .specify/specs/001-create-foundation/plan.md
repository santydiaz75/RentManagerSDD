# Plan Tecnico - Foundation

## Arquitectura

Frontend estático multipágina en `/app`, ejecutable con `file://`. La solución se organiza por dominios y módulos de responsabilidad única para mantener bajo acoplamiento.

## Responsabilidades de modulos JS

- `app.js` — inicialización, routing básico entre páginas, arranque general
- `storage.js` — lectura, escritura, seed inicial y utilidades sobre Local Storage
- `ui.js` — navbar, cards, botones, formularios, alertas, badges y render reutilizable
- `properties.js` — contrato base del dominio de propiedades y puntos de extensión
- `tenants.js` — contrato base del dominio de inquilinos y puntos de extensión
- `rentals.js` — contrato base del dominio de rentas y puntos de extensión

## Decisiones tecnicas

1. Patrón de módulo:
  - Se implementa el patrón de módulos definido por la constitución en todos los archivos de `app/js`.
  - `app.js` orquesta el arranque y delega en APIs públicas por dominio.

2. Persistencia:
  - `storage.js` concentra operaciones de lectura/escritura, seed y mensajería flash.
  - Las claves y convenciones de persistencia se consumen desde la definición canónica de la constitución.
  - Inicialización idempotente: seed solo cuando no existe data previa.

3. Sistema visual reusable:
  - Tokens de diseño centralizados en `styles.css`.
  - Convención BEM relajada (`block`, `block__element`, `block--modifier`).
  - Shell común: sidebar + header + contenido principal.
  - Iconografía SVG outline centralizada en `ui.js` y estilizada en `styles.css`.
  - Menú lateral principal fijo con 4 entradas y estado activo por `activeKey` en `mountShell`.

4. Seed de imágenes:
  - `createSeedPhotoUrl(id)` genera `https://picsum.photos/seed/<id>/800/500`.
  - La URL final se persiste en el campo `image`.
  - Fallback visual en cards cuando la imagen no carga (`is-fallback`).

5. Accesibilidad mínima:
  - labels asociadas a inputs.
  - `alt` descriptivo en imágenes.
  - foco visible en elementos interactivos.

## No duplicacion normativa

- Este plan no redefine restricciones globales de stack, alcance o modelo de datos.
- Cuando una decisión es normativa, se referencia la constitución en lugar de repetirla.

## Trazabilidad con spec y constitution

Este plan detalla decisiones de implementación. 
Reglas inmutables y alcance general permanecen en `.specify/memory/constitution.md`; criterios funcionales de aceptación están en `spec.md`.