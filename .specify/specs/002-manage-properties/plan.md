# Plan Tecnico - Manage Properties
Esta spec se implementa como una capacidad autosuficiente de administración de propiedades. El plan cubre únicamente listado, alta, edición, validación y persistencia del catálogo, sin asumir dashboards, contratos, inquilinos ni otros flujos derivados.

## Páginas
- `app/pages/properties.html`
- `app/pages/add-property.html`
- `app/pages/edit-property.html`

## Módulo
- `js/properties.js` expone:
  - `createProperty(data)`
  - `updateProperty(id, data)`
  - `getPropertyById(id)`
  - `listProperties({ status })`
  - `validateProperty(data)`

## Validaciones
- Campos obligatorios: title, address, price, status, bedrooms, bathrooms.
- `price`, `bedrooms`, `bathrooms` deben ser números > 0.
- `description` debe persistirse como texto legible para la card y la edición.
- `image` opcional; si vacío, se asigna URL determinista vía `createSeedPhotoUrl(id)`.

## Render
- `ui.js` expone `renderPropertyCard(property)` con grid de 3 columnas en escritorio.
- Filtro por estado se implementa en cliente, sin recargar página.
- La card mantiene estructura visual estable aunque cambien longitud de título, descripción o metadatos.
- La acción principal disponible en esta spec es editar la propiedad.

## Persistencia
- Toda I/O pasa por `storage.js` con clave `RentManagerSDD.properties`.
- Cada propiedad persiste el modelo base completo definido en `000-foundation`.
- `updatedAt` se actualiza automáticamente en cada `updateProperty`.

## Fuera de alcance del plan
- Métricas agregadas para página de inicio o dashboard.
- Disponibilidad derivada de contratos o flujos de renta.
- Relación de propiedades con inquilinos u otras entidades.
