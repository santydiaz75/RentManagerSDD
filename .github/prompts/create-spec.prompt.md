---
name: create-spec
description: Crear una spec con el numero y nombre proporcionados al invocar el prompt
---

Configuracion
- SPEC_NUMBER: ${input:SPEC_NUMBER}  
- SPEC_NAME: ${input:SPEC_NUMBER}-${input:SPEC_NAME}

Regla de resolucion de rutas:
- SPEC_DIR = .specify/specs/{SPEC_NAME}

Plantilla:

# Spec {SPEC_NAME}

## Estado

## Dependencias

## Contexto

## Objetivo

## Referencia normativa

## Criterios de aceptacion

## Fuera de alcance
