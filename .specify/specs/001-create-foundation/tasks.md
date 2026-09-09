# Tasks - Foundation

- [x] Crear estructura base en `/app` con `index.html`, `pages/`, `css/styles.css` y módulos `js/` definidos en la spec.
- [x] Se verificó que abrir el archivo principal en el navegador fuera suficiente para ver la app funcionando, sin necesidad de instalar nada ni levantar un servidor.
- [x] Implementar `app.js` como bootstrap y routing básico entre páginas.
- [x] Implementar `storage.js` como capa única de persistencia, aplicando la convención de claves y mensajería flash definida en la constitución.
- [x] Implementar seed automático inicial con datos realistas (mínimo 6 propiedades y 3 inquilinos).
- [x] Definir y estabilizar el modelo base de renta con referencia por `tenantId` y coherencia estructural entre propiedad, inquilino y contrato.
- [x] Implementar `ui.js` con render reusable (sidebar, métricas, cards, badges, alertas, mensajes flash y confirmaciones).
- [x] Implementar módulos de dominio `properties.js`, `tenants.js` y `rentals.js` con contrato base y puntos de extensión, aplicando el patrón de módulos definido en la constitución.
- [x] Construir sistema visual desktop-first en `styles.css` con tokens y componentes reutilizables (botones, formularios, badges, alerts).
- [x] Implementar iconografía SVG outline consistente en sidebar, quick actions y metadatos de cards.
- [x] Fijar menú lateral principal con 4 entradas (`Dashboard`, `Mis propiedades`, `Nueva propiedad`, `Registrar renta`) mostrando título, subtítulo y estado activo.
- [x] Implementar imágenes deterministas de seed con `https://picsum.photos/seed/<id>/800/500` y fallback visual al fallo de carga.