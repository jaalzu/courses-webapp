# Architecture

Este proyecto usa una arquitectura por dominio inspirada en Clean Architecture y Feature-Sliced Design. La regla principal es simple: el dominio no conoce Next, Supabase, fetch, Zustand ni componentes.

## Capas

- `app`: rutas de Next.js, layouts, API routes y composicion de paginas.
- `src/entities/<domain>/domain`: contratos, reglas puras y logica de negocio sin frameworks.
- `src/entities/<domain>/application`: casos de uso. Orquesta reglas de dominio y repositorios.
- `src/entities/<domain>/infrastructure`: adapters externos, mappers y repositorios concretos, por ejemplo Supabase o mocks.
- `src/entities/<domain>/model`: hooks y stores para conectar la aplicacion con React/TanStack/Zustand.
- `src/features`: flujos accionables del usuario, por ejemplo auth, favoritos, admin o foro.
- `src/widgets`: bloques de UI que componen entidades y features.
- `src/shared`: UI base, providers, utilidades tecnicas y clientes genericos.

## Dependencias permitidas

- `domain` puede importar tipos del mismo dominio y utilidades puras.
- `application` puede importar `domain` y contratos de repositorio.
- `infrastructure` puede importar `domain`, clientes externos y mappers.
- `model` puede importar `application`, `domain` y librerias de estado/datos.
- `features` puede importar `entities` y `shared`.
- `widgets` puede importar `features`, `entities` y `shared`.
- `shared` no debe importar `features`, `widgets` ni dominios concretos, salvo tipos tecnicos realmente compartidos.

## Regla practica

Si una funcion habla con Supabase o `fetch`, va a `infrastructure`. Si valida una regla de negocio, calcula, filtra o decide sin depender del navegador, va a `domain`. Si representa una accion del sistema como "crear curso" o "listar cursos", va a `application`.

## Ejemplo: courses

`courseRepository` define el contrato en `domain`. `courseUseCases` expone acciones del sistema en `application`. `supabaseCourseRepository` y `mockCourseRepository` implementan el contrato en `infrastructure`. Los hooks `useCourses` y `useCourseMutations` quedan en `model` porque son integracion con React Query.

