# JavaCourses - LMS Privado para Mentores

![JavaCourses Banner](https://tu-url-de-imagen.com/banner.png) 

JavaCourses es una plataforma educativa de acceso controlado diseñada para programas de mentoría profesional. Permite a los mentores gestionar contenido exclusivo, realizar seguimiento del progreso de los alumnos y fomentar la comunidad en un entorno privado.

## 🚀 Highlights Técnicos

Este proyecto es una demostración de arquitectura frontend de alto nivel:

- **Arquitectura FSD (Feature-Sliced Design):** Organización modular para máxima escalabilidad y separación de intereses.
- **Seguridad Multi-capa:** Protección de datos mediante Middleware (Next.js), Route Handlers y Row Level Security (Supabase).
- **Modo Demo (Sandbox):** Sistema de protección que bloquea escrituras para usuarios invitados y reinicia el progreso automáticamente al iniciar sesión.
- **Gestión Inteligente de Assets:** Sincronización automática entre DB y Storage para evitar archivos huérfanos al editar o borrar cursos.

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 15+ (App Router), React, TypeScript.
- **Estado & Datos:** Zustand (Estado Global), Supabase Client (SSR Friendly).
- **Backend:** Supabase (PostgreSQL, Auth, Storage).
- **Styling:** Tailwind CSS, shadcn/ui.
- **Validación:** Zod + React Hook Form.

## 📦 Características Principales

### Para el Alumno (Emprendedor)
- **Visualizador Pro:** Interfaz de clases sin distracciones.
- **Progreso en tiempo real:** Tracking visual de lecciones completadas.
- **Comunidad:** Foro interactivo por curso con sistema de hilos.

### Para el Mentor (Admin)
- **Gestión de Catálogo:** CRUD completo de cursos y lecciones con carga de imágenes.
- **Limpieza de Assets:** Sistema automático de borrado de imágenes huérfanas en Storage.
- **Métricas de Alumnos:** Visualización detallada del avance de cada emprendedor.

---

## 🏗️ Arquitectura de Seguridad (Demo Mode)

Para facilitar la evaluación del proyecto por parte de reclutadores, se implementó una cuenta de demostración (`admin@demo.com`) con las siguientes características:

1. **Interceptores de API:** Bloqueo de peticiones `POST/PUT/DELETE` en el servidor para evitar alteraciones en la base de datos pública.
2. **Auto-Reset:** Al detectar el inicio de sesión del usuario demo, un proceso de limpieza (Trigger o Hook) reinicia la tabla `user_progress`.
3. **UI Condicional:** Los elementos administrativos muestran estados deshabilitados y Tooltips informativos para usuarios invitados.

---

## 🔧 Instalación y Setup

1. **Clonar el repo:**
   ```bash
   git clone [https://github.com/tu-usuario/javacourses.git](https://github.com/tu-usuario/javacourses.git)
   cd javacourses