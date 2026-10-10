# Spec 005 - Create README

## Estado
implement

## Dependencias
- 001-create-foundation
- 002-manage-properties
- 003-manage-tenants
- 004-manage-rentals

## Contexto
El repositorio no cuenta con un README en la raíz que explique el propósito de RentManagerSDD, sus capacidades actuales y cómo abrir la aplicación. La documentación debe reflejar fielmente el proyecto existente y sus restricciones técnicas.

## Objetivo
Crear un README raíz que permita a una persona entender para qué sirve la aplicación, cómo abrirla y cómo está organizado el proyecto.

## Referencia normativa
- `.specify/memory/constitution.md`
- `AGENTS.md`
- `.specify/specs/001-create-foundation/spec.md`
- `.specify/specs/002-manage-properties/spec.md`
- `.specify/specs/003-manage-tenants/spec.md`
- `.specify/specs/004-manage-rentals/spec.md`

## Criterios de aceptacion
- Existe un archivo `README.md` en la raíz del repositorio.
- El README describe RentManagerSDD como una aplicación web de gestión de renta de propiedades.
- Resume las capacidades existentes para gestionar propiedades, inquilinos y rentas sin atribuir funcionalidades no implementadas.
- Explica que la aplicación se abre directamente desde `app/index.html` en un navegador y que no requiere servidor ni proceso de build.
- Describe la estructura principal del proyecto y las responsabilidades de sus carpetas o módulos principales.
- Documenta las restricciones técnicas relevantes: HTML, CSS y JavaScript vanilla, sin frameworks ni paquetes npm, con persistencia en `localStorage`.
- La documentación está escrita en español y no modifica el comportamiento ni el código funcional de la aplicación.

## Fuera de alcance
- Cambios a la aplicación o a sus datos.
- Incorporar frameworks, dependencias, servidor o proceso de build.
- Documentar funcionalidades futuras como si ya estuvieran implementadas.
