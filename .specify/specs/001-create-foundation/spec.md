# Spec 001: Cimientos del proyecto

## Estado
implement

## Dependencias
ninguna

## Contexto
Define la base técnica y visual compartida por todas las capacidades del sistema. Esta spec se centra en resultados verificables de implementación de cimientos; las reglas inmutables (stack, límites, modelo canónico y fuera de alcance) se heredan de la constitución y no se redefinen aquí.

## Objetivo
Establecer un esqueleto técnico y visual consistente sobre el cual construir las capacidades funcionales (dashboard, propiedades, inquilinos, rentas).

## Referencia normativa
Esta spec hereda y respeta totalmente `.specify/memory/constitution.md`. Ante conflicto, prevalece la constitución.

## Criterios de aceptacion

1. La app funciona abriendo directamente `/app/index.html` con `file://`, sin servidor ni pasos de build.

2. La estructura base existe dentro de `/app`:
	- `index.html`
	- `css/styles.css`
	- `js/app.js`, `js/storage.js`, `js/ui.js`, `js/properties.js`, `js/tenants.js`, `js/rentals.js`
	- `pages/properties.html`, `pages/add-property.html`, `pages/edit-property.html`, `pages/rent-property.html`, `pages/tenants.html`, `pages/add-tenant.html`, `pages/edit-tenant.html`

3. La base de módulos JS en `/app/js` aplica el patrón y reglas transversales definidas en la constitución, verificables en `app.js`, `storage.js`, `ui.js`, `properties.js`, `tenants.js` y `rentals.js`.

4. La persistencia de la base queda centralizada en `js/storage.js`, incluyendo seed inicial y mensajería flash entre páginas, de acuerdo con la convención de claves establecida en la constitución.

5. El sistema visual base es desktop-first y reusable:
	- layout con sidebar + contenido principal
	- tarjetas de métricas y tarjetas de entidad
	- formularios, badges, alertas y mensajes flash
	- iconografía SVG outline consistente
	- menú lateral principal con 4 entradas: `Dashboard`, `Mis propiedades`, `Nueva propiedad`, `Registrar renta`

6. Seed inicial:
	- mínimo 6 propiedades con estados variados
	- mínimo 3 inquilinos realistas
	- rentas coherentes referenciando propiedad e inquilino por `id`
	- imagen determinista por propiedad vía `https://picsum.photos/seed/<id>/800/500`
	- fallback visual cuando una imagen no carga

7. La base UI implementa de extremo a extremo el flujo mínimo de interacción sobre páginas y componentes reutilizables, manteniendo validación, confirmación y feedback visual según la constitución.

## Fuera de alcance

Aplican directamente las restricciones de fuera de alcance definidas en la constitución.
