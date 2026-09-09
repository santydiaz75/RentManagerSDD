# Spec 002 - Manage Properties

## Estado
implement

## Dependencias
- 001-create-foundation

## Contexto
Esta spec define la primera capacidad de negocio del sistema: la administración del catálogo de propiedades. Debe ser autosuficiente y entendible por sí misma, sin asumir la existencia de otras entidades, pantallas o flujos adicionales.

## Objetivo
Permitir al usuario crear, editar, listar y filtrar propiedades con una interfaz visualmente consistente, manteniendo integridad de datos y una experiencia clara en escritorio y móvil.

## Paginas

### `pages/properties.html` — Listado
- Listado completo de propiedades
- Cada card muestra: imagen, título, dirección, precio, descripción breve, habitaciones, baños, estado y acción principal de edición
- Filtro por estado
- Badge visible de estado
- Mensaje visual si no hay resultados
- Exactamente 3 propiedades por fila en escritorio
- Adaptación responsive en tablet y móvil

### `pages/add-property.html` — Alta
- Formulario para registrar propiedad con validaciones de:
  - `title`, `address`, `price`, `description`, `status`, `bedrooms`, `bathrooms`, `image`

### `pages/edit-property.html` — Edición
- Carga de datos existentes
- Edición conservando consistencia
- Actualiza `updatedAt` al guardar


## Modelo

```txt
Property {
  id: string
  title: string
  address: string
  price: number
  description: string
  status: 'disponible' | 'rentada' | 'en mantenimiento'
  bedrooms: number
  bathrooms: number
  image: string
  createdAt: string
  updatedAt: string
}
```

## Reglas de negocio

- Se pueden crear propiedades en cualquier momento.
- Se pueden actualizar propiedades en cualquier momento.
- El estado puede cambiar entre `disponible`, `rentada`, `en mantenimiento`.
- La imagen es opcional; si no se proporciona, se asigna una URL determinista basada en el `id`.
- Validación obligatoria antes de persistir.
- Mensajes visuales de éxito/error tras cada operación.
- Confirmación visible antes de guardar cambios relevantes.
- No se contempla eliminación de propiedades en esta versión.
- El módulo de propiedades no depende de relaciones con otras entidades para cumplir esta spec.

## Criterios visuales
- Estructura visual consistente en todas las cards
- Altura uniforme para la sección de imagen/header
- Distribución consistente del body aunque cambie longitud de título o descripción
- Alineación consistente de precio y botones de acción entre cards
- Variaciones de texto no rompen la alineación general

## Fuera de alcance de esta spec
- Registro de contratos o rentas
- Gestión de inquilinos u otras entidades relacionadas
- Dashboard, métricas globales o accesos rápidos de inicio
- Flujos dependientes de otras capacidades del sistema
- Búsqueda por texto, ordenamientos avanzados
- Eliminación de propiedades


