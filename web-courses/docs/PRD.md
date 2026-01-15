# PRD: JavaCourses

## 1. Resumen Ejecutivo
Plataforma educativa privada de acceso controlado, diseñada como un valor agregado exclusivo para programas de mentoría profesional. El sistema permite al mentor organizar contenido especializado para emprendedores, garantizando que el material sea accesible únicamente mediante invitación y bajo gestión administrativa directa.

| Aspecto | Detalle |
| :--- | :--- |
| **Tipo** | LMS Privado (Learning Management System) |
| **Mercado** | Mentoría profesional y Formación de Emprendedores |
| **Plataforma** | Web (Responsive - Desktop/Mobile) |
| **Estado actual** | MVP - UI implementada con datos mock (Frontend completo) |

---

## 2. Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Lenguaje** | TypeScript |
| **Base de datos** | PostgreSQL (Supabase) |
| **Cliente DB** | Supabase SDK |
| **UI Components** | shadcn/ui |
| **Styling** | Tailwind CSS |
| **Estado global** | Zustand |
| **Auth** | Supabase Auth (JWT & Cookies)  |

---

## 3. Usuarios y Roles

| Rol | Descripción | Permisos Clave |
| :--- | :--- | :--- |
| **Mentor (Admin)** | Dueño de la academia y gestor del programa. | • Crear/Editar cursos y módulos.<br>• Subir material (videos/PDFs).<br>• Gestionar acceso de alumnos (Invitaciones).<br>• Dashboard con métricas de progreso. |
| **Emprendedor (Alumno)** | Cliente exclusivo del programa de mentoría. | • Visualizar contenido de cursos asignados.<br>• Editar perfil personal. |

---

## 4. Funcionalidades Principales

### 4.1 Academia Privada
* **Visualizador de Clases:** Interfaz optimizada para el consumo de contenido en video sin distracciones.
* **Organización Jerárquica:** Contenido estructurado por Cursos, Módulos y Lecciones.
* **Sistema de Favoritos:** Capacidad para que el usuario guarde lecciones específicas y acceda a ellas rápidamente desde su perfil.
* **Control de Acceso:** Sistema privado por invitación; acceso restringido mediante Middleware si no hay una sesión válida.

### 4.2 Espacio de Comunidad (Foro)
* **Hilos de Discusión:** Espacio para que los emprendedores realicen consultas, compartan experiencias y generen networking.
* **Interacción Directa:** Sistema de comentarios y respuestas en hilos específicos o asociados a las lecciones.

### 4.3 Autenticación y Seguridad (Auth & User)
* **Acceso Controlado:** Registro y Login gestionado con **Supabase Auth** (JWT & Cookies).
* **Validación de Datos:** Uso de **react-hook-form + Zod** para asegurar la integridad de los datos en formularios de acceso y perfil.
* **Protección de Rutas:** Seguridad a nivel de servidor y cliente para prevenir acceso no autorizado.

### 4.4 Perfil de Usuario
* **Gestión de Cuenta:** Actualización de datos personales y de seguridad.
* **Métricas de Aprendizaje:** Visualización del progreso (porcentaje de completado y lecciones vistas vs. totales).
* **Sección de Favoritos:** Listado de lecciones marcadas por el usuario para acceso directo.

### 4.5 Administración (Panel del Mentor)
* **Gestión de Invitaciones y Roles:** * Sistema de "Whitelist" para autorizar correos electrónicos.
    * Asignación y cambio de roles (Mentor/Emprendedor).
* **Gestión Integral de Contenido (CRUD):** * Panel para Crear, Editar y Borrar cursos y lecciones.
    * Carga de metadatos (solo **nombre del archivo** para imágenes y videos).
* **Moderación del Foro:** * Herramientas para editar o borrar comentarios/hilos inapropiados para mantener el entorno profesional.
---

## 5. Modelo de Datos (Esquema Inicial)

> **Nota:** Recordar guardar solo el **nombre del archivo** de imagen en la DB para optimizar el almacenamiento.

* **User:** id, email, password, role.
* **Product:** id, name, description, price, image_filename (String).
* **Order:** id, userId, status, total.

---

## 6. Estructura de Páginas

| Sección | Rutas ejemplo |
| :--- | :--- |
| **Públicas** | `/`, `/products`, `/login` |
| **Privadas** | `/cart`, `/checkout`, `/profile` |
| **Admin** | `/admin/dashboard`, `/admin/products` |

---

## 7. API Endpoints

* `GET /api/products` - Obtener lista de productos.
* `POST /api/checkout` - Procesar intención de pago.

---

## 8. Requisitos No Funcionales
* **Performance:** Uso de Skeletons para estados de carga.
* **SEO:** Metadata dinámica para productos.
* **UI:** Soporte para Dark/Light mode con `next-themes`.

---

## 9. Fases de Implementación
1.  **Fase 1:** Configuración de Base de Datos y Modelos.
2.  **Fase 2:** CRUD de administración.
3.  **Fase 3:** Flujo de compra del cliente.