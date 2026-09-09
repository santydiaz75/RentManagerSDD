# Plan Técnico — Rentas

## Página
- `app/pages/rent-property.html`

## Módulo
- `js/rentals.js` expone:
  - `createRental(data)` — crea renta y actualiza estado de la propiedad asociada
  - `listRentalsByPropertyId(propertyId)`

## Flujo de creación
1. Usuario llega a `rent-property.html?id=<propertyId>` (o selecciona desde un selector).
2. Se carga la propiedad vía `RentManagerSDDProperties.getPropertyById(id)` para mostrar contexto.
3. Dropdown de inquilino se llena con los inquilinos disponibles en los datos de la app.
4. Validación cliente: fechas, monto, campos obligatorios.
5. Confirmación modal antes de persistir.
6. `RentManagerSDDRentals.createRental(data)` invoca `RentManagerSDDProperties.updateProperty(propertyId, { status: 'rentada' })` si el contrato es `activo`.
7. Mensaje flash de éxito y redirección al flujo principal de propiedades.

## Validaciones
- `startDate` y `endDate` parseables como fechas válidas.
- `endDate > startDate`.
- `rentAmount` numérico positivo.
- `contractStatus` dentro de `['activo', 'pendiente', 'finalizado']`.
- `propertyId` y `tenantId` deben existir.
