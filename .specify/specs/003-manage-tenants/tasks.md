# Tasks — Manage Inquilinos

## Storage y modelo
- [x] Agregar clave `RentManagerSDD.tenants` en `storage.js`
- [x] Implementar `buildTenantRecord(data, overrides)` en `storage.js`
- [x] Implementar `getTenants()` y `saveTenants()` en `storage.js`
- [x] Extender `ensureSeedData()` para crear 3 inquilinos realistas si no existen

## Módulo de dominio
- [x] Crear `js/tenants.js` (IIFE) que exponga `window.RentManagerSDDTenants`
- [x] Implementar `createTenant`, `updateTenant`, `getTenantById`, `listTenants`, `findByDocumentId`
- [x] Implementar `validateTenant(data)` para centralizar reglas de validación
- [x] Validar email con regex básica
- [x] Validar unicidad de `documentId` en alta y edición

## Páginas
- [x] Crear `pages/tenants.html` con listado y búsqueda básica por nombre
- [x] Crear `pages/add-tenant.html` con formulario validado
- [x] Crear `pages/edit-tenant.html` con carga de datos existentes y actualización de `updatedAt`
- [x] Mostrar estado vacío cuando no hay inquilinos
- [x] Mostrar mensajes de éxito/error y confirmaciones

## UI compartida
- [x] Mantener acceso a inquilinos dentro de la navegación base de la app
- [x] Implementar `renderTenantRow(tenant)` en `ui.js`

## Verificación
- [x] Validar que al borrar Local Storage se generan 3 inquilinos coherentes
- [x] Validar búsqueda básica por nombre y unicidad de `documentId`
