# JavaCourses - LMS Privado para Mentores

![JavaCourses Banner](https://tu-url-de-imagen.com/banner.png) 

JavaCourses es una plataforma educativa de acceso controlado diseñada para programas de mentoría profesional. Permite a los mentores gestionar contenido exclusivo, realizar seguimiento del progreso de los alumnos y fomentar la comunidad en un entorno privado.

## 🚀 Highlights Técnicos

Este proyecto no es solo un LMS, es una demostración de arquitectura frontend moderna:

- **Arquitectura FSD (Feature-Sliced Design):** Organización de código basada en funcionalidades para máxima escalabilidad y desacoplamiento.
- **Orquestación de API:** Implementación de Route Handlers en Next.js para coordinar la integridad entre la base de datos (Supabase DB) y el almacenamiento físico (Supabase Storage), incluyendo limpieza automática de assets.
- **Performance de Elite:** Estrategias de prefetching de datos con TanStack Query al hacer hover en las cards, logrando transiciones de página instantáneas.
- **Seguridad Robusta:** Autenticación gestionada mediante Supabase Auth con persistencia en Cookies para Server-Side Rendering (SSR).

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 16 (App Router), React, TypeScript.
- **Estado & Datos:** TanStack Query (Caché & Prefetching), Zustand (Estado Global).
- **Backend:** Supabase (PostgreSQL, Auth, Storage).
- **Styling:** Tailwind CSS, shadcn/ui.
- **Validación:** Zod + React Hook Form.

## 📦 Características Principales

### Para el Alumno (Emprendedor)
- **Visualizador Pro:** Interfaz de clases sin distracciones.
- **Sistema de Favoritos:** Marcadores persistentes para lecciones clave.
- **Progreso en tiempo real:** Tracking visual de lecciones completadas vs. pendientes.
- **Comunidad:** Foro interactivo por curso y notificaciones de respuestas.

### Para el Mentor (Admin) - [VER CAPTURAS]
- **Gestión de Catálogo:** CRUD completo de cursos y lecciones con carga de imágenes.
- **Limpieza de Assets:** El sistema elimina automáticamente del Storage las imágenes de cursos borrados o actualizados.
- **Control de Alumnos:** Gestión de accesos y visualización de métricas de progreso individual.

---

## 🏗️ Arquitectura de Datos

El sistema utiliza un modelo relacional optimizado para acceso controlado. Puedes consultar el [Data Model Detallado aquí](./docs/DATA_MODEL.md).



## 🔧 Instalación y Setup

1. Clonar el repo: `git clone ...`
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno (`.env.local`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...