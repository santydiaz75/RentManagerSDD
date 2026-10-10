# RentManagerSDD

RentManagerSDD es una aplicación web sencilla para gestionar la renta de propiedades. Permite organizar un inventario de inmuebles, mantener registros de inquilinos y registrar contratos de renta desde una interfaz local.

## Funcionalidades

- **Dashboard:** resumen de propiedades, inquilinos, rentas activas e ingreso mensual de contratos activos.
- **Propiedades:** listar y filtrar por estado, registrar y editar inmuebles.
- **Inquilinos:** consultar y buscar por nombre, registrar y editar inquilinos.
- **Rentas:** registrar un contrato vinculando una propiedad con un inquilino, con fechas, monto y estado del contrato.

## Cómo abrir la aplicación

No se requiere instalar dependencias, iniciar un servidor ni ejecutar un proceso de compilación. Abre el archivo [`app/index.html`](./app/index.html) directamente en un navegador. La aplicación funciona desde el archivo local (`file://`).

Los datos se guardan en `localStorage` del navegador. Al iniciar por primera vez, la aplicación carga datos de ejemplo para propiedades, inquilinos y rentas.

## Estructura del proyecto

```text
app/
  index.html          Punto de entrada y dashboard
  css/
    styles.css        Estilos y componentes visuales
  js/
    app.js            Inicialización y renderizado de páginas
    storage.js        Persistencia local, datos iniciales y mensajes flash
    ui.js             Navegación y componentes de interfaz reutilizables
    properties.js     Operaciones y validaciones de propiedades
    tenants.js        Operaciones y validaciones de inquilinos
    rentals.js        Registro y validaciones de rentas
  pages/
    properties.html       Listado de propiedades
    add-property.html     Alta de propiedad
    edit-property.html    Edición de propiedad
    tenants.html          Listado de inquilinos
    add-tenant.html       Alta de inquilino
    edit-tenant.html      Edición de inquilino
    rent-property.html    Registro de renta
.specify/
  memory/             Constitución del proyecto
  specs/              Especificaciones, planes y tareas
```

## Tecnologías y límites

- HTML, CSS y JavaScript vanilla, sin frameworks ni paquetes npm.
- Los módulos JavaScript se cargan directamente desde las páginas; no se necesita bundler.
- `localStorage` es la única persistencia y su acceso está centralizado en `app/js/storage.js`.
- La información se almacena en el navegador y no se sincroniza con un servidor o entre dispositivos.
