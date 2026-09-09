# Spec 004 - Manage rentals

## Estado
implement

## Dependencias
- 001-create-foundation
- 002-manage-properties
- 003-manage-tenants

## Contexto
Permite registrar el contrato de renta de una propiedad, manteniendo la consistencia entre el estado de la propiedad y la existencia del contrato. Esta capacidad debe poder evolucionar de forma gradual sin depender de integraciones posteriores.

## Objetivo
Permitir registrar una renta en menos de un minuto, con validación, confirmación y actualización automática del estado de la propiedad asociada.

## Páginas

### `pages/rent-property.html` — Registro de renta
- Selección o identificación de la propiedad (vía query string `?id=` o selector)
- Selección de inquilino desde dropdown poblado con inquilinos disponibles en los datos de la app
- Campos del contrato:
  - `startDate` (obligatorio)
  - `endDate` (obligatorio, posterior a startDate)
  - `rentAmount` (obligatorio, numérico > 0)
  - `contractStatus` (obligatorio, default `activo`)
- Mostrar contexto de la propiedad seleccionada (imagen, título, dirección, precio sugerido)
- Confirmación visible antes de guardar

## Modelo

```
Rental {
  id: string
  propertyId: string
  tenantId: string
  startDate: ISO date
  endDate: ISO date
  rentAmount: number
  contractStatus: 'activo' | 'pendiente' | 'finalizado'
  createdAt: ISO date
}
```

## Reglas de negocio

- Se puede registrar una renta en cualquier momento.
- Al registrar una renta con estado `activo`, la propiedad asociada cambia a `rentada`.
- `endDate` debe ser posterior a `startDate`.
- `rentAmount` debe ser un número positivo.
- Validación obligatoria antes de persistir.
- Confirmación previa al guardar.
- Mensaje visual tras éxito o error.
- Si la propiedad ya está `rentada` con un contrato activo, advertir al usuario antes de continuar.

## Criterios visuales

- Reutilizar componentes de formulario y mensajes existentes.
- Mostrar tarjeta de contexto de la propiedad de forma consistente con las cards del catálogo.

## Fuera de alcance de esta spec

- Listado dedicado de contratos
- Cancelación, terminación anticipada o renovación automática
- Pagos, recibos o recordatorios
- Historial de cambios de estado
