# Spec 003 : Gestion de Inquilinos


## Estado
implement

## Dependencias
- 001-create-foundation

## Contexto
Esta spec introduce la segunda entidad de negocio del sistema como una capacidad autosuficiente: la gestión de inquilinos. Debe poder entenderse e implementarse sin asumir la existencia de rentas, dashboard ni otras pantallas posteriores.

## Objetivo
Permitir registrar, listar y editar inquilinos con una interfaz consistente, validaciones claras e integridad de datos, manteniendo la aplicación preparada para crecer gradualmente.

## Páginas

### `pages/tenants.html` — Listado
- Listado completo de inquilinos
- Cada item muestra: nombre, email, teléfono, documento y notas resumidas si existen
- Búsqueda básica por nombre (mínimo viable)
- Mensaje visual si no hay inquilinos
- Acciones: editar, ver detalle (opcional)

### `pages/add-tenant.html` — Alta
- Formulario con validaciones de:
  - `name` (obligatorio)
  - `email` (obligatorio, formato válido)
  - `phone` (obligatorio)
  - `documentId` (obligatorio, único)
  - `notes` (opcional)

### `pages/edit-tenant.html` — Edición
- Carga datos existentes
- Permite actualizar todos los campos excepto `id`
- Actualiza `updatedAt`

## Modelo

```
Tenant {
  id: string
  name: string
  email: string
  phone: string
  documentId: string
  notes: string
  createdAt: ISO date
  updatedAt: ISO date
}
```

## Reglas de negocio

- `documentId` debe ser único entre inquilinos.
- `email` debe pasar validación básica de formato.
- Validación obligatoria antes de persistir.
- Mensajes visuales de éxito/error.
- Confirmación visible antes de guardar cambios relevantes.
- No se contempla eliminación de inquilinos en esta versión.

## Evolución gradual

- Esta spec solo cubre el CRUD base de inquilinos.
- Cualquier relación futura con rentas, contratos, dashboard o métricas globales deberá definirse en specs posteriores.

## Datos de prueba

- Mínimo 3 inquilinos de seed con datos realistas distintos.

## Criterios visuales

- Listado con cards o filas consistentes con el sistema visual del proyecto.
- Reutilizar componentes de formulario, badges y mensajes existentes.

## Fuera de alcance de esta spec

- Eliminación de inquilinos
- Historial detallado de rentas por inquilino
- Integración con formularios de renta o contratos
- Dashboard, métricas globales o accesos rápidos de inicio
- Importación masiva
- Verificación externa de identidad
