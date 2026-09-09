# Constitucion del Proyecto 
> Este archivo define las reglas inmutables del proyecto. Ninguna spec, plan ni task puede contradecirlo. Ante cualquier duda o conflicto, este documento es la fuente de verdad superior.

---

## 1. Descripcion del proyecto
Aplicacion web de **gestion de renta de propiedades** construida utilizando el Spec-Driven Development. Permite registrar propiedades, inquilinos y contratos de renta con persistencia local en el navegador.

## 2. Stack tecnologico

- **Lenguajes permitidos:** HTML, CSS y Javascript vanilla unicamente.
- **Persistencia:** Local Storage del navegador.
- **Prohibido:** frameworks (React, Vue, JQuery), librerias npm, Typescript, preprocesadores CSS y cualquier backend.
- **Sin gestor de paquetes:** npm, yarn y pnmp estan fuera del alcance. El proyecto no tiene `package.json`.

## 3. Estructura de archivos

Todo el codigo funcional vive dentro de `/app`. No se crean archivos fuera de esta carpeta.

```
app/
    index.html
    css/styles.css
    js/
        app.js
        storage.js
        ui.js
        properties.js
        tenant.js
        rentals.js
    pages/
        properties.html
        add-property.html
        edit-property.html
        rent-property.html
        tenants.html
        add-tenant.html
        edit-tenant.html
```
La aplicacion se abre directamente desde `app/index.html` con `file://`.
No requiere servidor.


## 4. Patrones de código

- Cada archivo JS es una **IIFE** que expone su API en `window.RentManagerSDDXxx`.
- No se usan `import`/`export` ESM para garantizar compatibilidad con `file://`.
- Sin `async/await` salvo necesidad real justificada. 
- Separación estricta de responsabilidades:

| Módulo | Responsabilidad |
|---|---|
| `app.js` | Bootstrap, inicialización y routing entre páginas |
| `storage.js` | Única capa autorizada para leer/escribir en Local Storage |
| `ui.js` | Render reutilizable: navbar, cards, badges, alertas, formularios |
| `properties.js` | Dominio de propiedades: CRUD y validaciones |
| `tenants.js` | Dominio de inquilinos: CRUD y validaciones |
| `rentals.js` | Dominio de rentas: registro y consistencia de estados |

---

## 5. Persistencia y datos

- **Solo `storage.js`** accede a `localStorage`. Ningún otro módulo lo hace directamente.
- Claves namespaced obligatorias:
  - `RentManagerSDD.properties`
  - `RentManagerSDD.tenants`
  - `RentManagerSDD.rentals`
  - `RentManagerSDD.flash` (mensajes entre páginas)
- Al primer inicio, si no hay datos, se genera seed automático.

---

## 6. Entidades de dominio

El sistema tiene tres entidades. Las specs deben respetar estos modelos.

**Propiedad:** `id`, `title`, `address`, `price`, `description`, `status`, `bedrooms`, `bathrooms`, `image`, `createdAt`, `updatedAt`

**Inquilino:** `id`, `name`, `email`, `phone`, `documentId`, `notes`, `createdAt`, `updatedAt`

**Renta:** `id`, `propertyId`, `tenantId`, `startDate`, `endDate`, `rentAmount`, `contractStatus`, `createdAt`

Estados de propiedad: `disponible` | `rentada` | `en mantenimiento`

Estados de contrato: `activo` | `pendiente` | `finalizado`

Los estados se definen en `storage.js` y se reutilizan desde todos los módulos.

---

## 7. Criterios de UI/UX

- Estilo moderno, limpio y profesional. Referencia visual: Notion, Google Keep, dashboards de gestión.

- **Desktop-first** con adaptación responsive en tablet y móvil.
- Composición global: sidebar lateral fija + área de contenido principal.
- Componentes obligatorios y reutilizables: navbar, cards de propiedad, tarjetas de métricas, accesos rápidos, badges de estado, formularios, alertas y mensajes flash.
- Visual: sombras suaves, bordes redondeados, espaciado generoso, jerarquía tipográfica clara.
- Iconografía: SVG outline, no emojis ni caracteres Unicode como íconos funcionales.

---

## 8. Reglas de calidad

- Todo formulario valida campos obligatorios antes de persistir.
- Toda acción sensible (crear, editar, cambiar estado) muestra confirmación al usuario.
- Toda operación muestra mensaje visual de éxito o error.
- Los mensajes entre páginas se transmiten vía `RentManagerSDD.flash` en Local Storage.

---

## 9. Datos de prueba

- Mínimo **6 propiedades** con estados variados (`disponible`, `rentada`, `en mantenimiento`).
- Mínimo **3 inquilinos** con datos realistas.
- Las rentas de seed deben referenciar propiedades e inquilinos del seed por `id`.
- Cada propiedad tiene imagen determinista via `https://picsum.photos/seed/<id>/800/500`.
- El campo `image` se persiste con la URL final en Local Storage.
- Si la imagen externa falla, la card muestra fallback sin romper el layout.

---

## 10. Organizacion de specs

- Cada feature/capacidad de negocio vive en su propia spec dentro de `.specify/specs/`.
- No se permite un spec monolítico.
- Orden de lectura obligatorio antes de cualquier cambio: `constitution.md` → `spec.md` → `plan.md` → `tasks.md`.
  
---

## 11. Fuera de alcance

Los siguientes temas están explícitamente excluidos de este proyecto:

- Autenticación y autorización
- Backend o base de datos remota
- Pagos o facturación
- Integraciones con servicios externos
- Eliminación de entidades (fuera de alcance en esta versión)

---
