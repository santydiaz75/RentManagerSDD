# Plan Técnico — Inquilinos

Esta spec se implementa como una capacidad autosuficiente de gestión de inquilinos. El plan cubre únicamente listado, alta, edición, validación y persistencia de la entidad, sin asumir rentas, dashboard ni otros flujos derivados.

## Páginas nuevas
- `app/pages/tenants.html`
- `app/pages/add-tenant.html`
- `app/pages/edit-tenant.html`

## Módulo nuevo
- `js/tenants.js` (IIFE) expone `window.RentManagerSDDTenants` con:
  - `createTenant(data)`
  - `updateTenant(id, data)`
  - `getTenantById(id)`
  - `listTenants({ search })`
  - `findByDocumentId(documentId)`
  - `validateTenant(data)`

## Extensión de storage.js
- Nueva clave: `RentManagerSDD.tenants`
- Funciones: `getTenants()`, `saveTenants(tenants)`
- Función `buildTenantRecord(data, overrides)` análoga a `buildPropertyRecord`
- Extender `ensureSeedData()` para crear 3 inquilinos si no existen

## Validaciones específicas
- Email: regex básica `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
- DocumentId único: chequeo en `createTenant` y `updateTenant`.

## Navegación
- Mantener el acceso a inquilinos dentro de la navegación base de la app, sin depender de accesos rápidos ni de pantallas posteriores.

## Render
- `ui.js` expone `renderTenantRow(tenant)` para el listado.
- El listado muestra datos de contacto y documento de forma consistente con el sistema visual base.

## Fuera de alcance del plan
- Integración con formularios de renta, contratos o lookup entre entidades.
- Métricas agregadas para dashboard o página de inicio.
- Historial de actividad o rentas por inquilino.
