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
| **Mentor (Admin)** | Dueño de la academia y gestor del programa. | • Crear/Editar cursos y módulos.<br>• Subir material (imagenes).<br>• Gestionar acceso de alumnos (Invitaciones).<br>• Dashboard con métricas de progreso. |
| **Emprendedor (Alumno)** | Cliente exclusivo del programa de mentoría. | • Visualizar contenido de cursos asignados.<br>• Editar perfil personal. |

---

## 4. Funcionalidades Principales

### 4.1 Academia Privada
* **Visualizador de Clases:** Interfaz optimizada para el consumo de contenido en video sin distracciones.
* **Organización Jerárquica:** Contenido estructurado por Cursos y Lecciones.
* **Gestión de Visibilidad:** Soporte para cursos públicos (abiertos a la comunidad) y privados (exclusivos por invitación o compra).
* **Sistema de Favoritos:** Capacidad para que el usuario guarde lecciones específicas y acceda a ellas rápidamente desde su perfil.
* **Control de Acceso:** Sistema privado por invitación; acceso restringido mediante Middleware si no hay una sesión válida.

### 4.2 Espacio de Comunidad (Foro)
* **Hilos de Discusión:** Espacio para que los emprendedores realicen consultas, compartan experiencias y generen networking.
* **Interacción Directa:** Sistema de comentarios y respuestas en hilos específicos o asociados a las lecciones.
* **Sistema de Notificaciones:** Alertas en tiempo real dentro de la plataforma para informar al usuario sobre nuevas respuestas en sus hilos o interacciones relevantes.

### 4.3 Autenticación y Seguridad (Auth & User)
* **Acceso Controlado:** Registro y Login gestionado con **Supabase Auth** (JWT & Cookies).
* **Validación de Datos:** Uso de **react-hook-form + Zod** para asegurar la integridad de los datos en formularios de acceso y perfil.
* **Protección de Rutas:** Seguridad a nivel de servidor y cliente para prevenir acceso no autorizado.

### 4.4 Perfil de Usuario
* **Gestión de Cuenta:** Actualización de datos personales y de seguridad.
* **Métricas de Aprendizaje:** Visualización del progreso (porcentaje de completado y lecciones vistas vs. totales).
* **Sección de Favoritos:** Listado de lecciones marcadas por el usuario para acceso directo.

### 4.5 Administración (Panel del Mentor)
* **Gestión de  Roles:** 
    * Asignación y cambio de roles (Admin/Student).
* **Gestión Integral de Contenido (CRUD):** * Panel para Crear, Editar y Borrar cursos y lecciones.
    * Carga de metadatos (solo **nombre del archivo** para imágenes y videos).
* **Gestión de Assets Inteligente: * Limpieza Automática de Storage** * Sistema sincronizado que detecta y elimina archivos huérfanos (imágenes antiguas) en Supabase Storage al actualizar o borrar cursos, evitando costos innecesarios y desorden en el servidor.
* **Moderación del Foro:** * Herramientas para editar o borrar comentarios/hilos inapropiados para mantener el entorno profesional.
* **Métricas de Alumnos** * Visualización detallada de qué lecciones ha completado cada emprendedor para dar seguimiento personalizado.



## 5. Modelo de Datos (Esquema Inicial)

> Modelo de datos simplificado que define las entidades principales del sistema.
> Los detalles técnicos y campos completos se documentarán en un archivo separado.

### User
Representa a una persona con acceso a la plataforma.

- Puede tener un rol (mentor o alumno)
- Puede acceder a contenido educativo

---

### Course
Representa una unidad de contenido educativo.

- Contiene lecciones
- El acceso está controlado por el sistema

---

### Lesson
Unidad básica de contenido.

- Pertenece a un curso
- Contiene material educativo (video u otros recursos)

---

### UserProgress
Representa el avance individual de cada alumno dentro de los cursos.

- Relaciona a un User con una Lesson específica.
- Permite calcular el porcentaje de completado de un Course.

---


### Enrollment
Define el acceso de un usuario a un curso.

- Relaciona usuarios con cursos

---

### Forum
Espacio de interacción entre usuarios.

- Permite discusiones entre participantes



## 6. Estructura de Páginas

| Sección | Rutas ejemplo |
| :--- | :--- |
| **Públicas** | `/`, `/login`, `/register` |
| **Privadas** | `/dashboard`, `/curso`, `/favoritos`, `/faqs`, `/perfil`, `/comunidad` |
| **Admin** | `/metricas`,`/course-access`  |



## 7. API y Acceso a Datos
> El sistema utiliza Supabase como backend principal.
> Se implementan Route Handlers en Next.js únicamente para acciones sensibles o integraciones específicas.

### Endpoints existentes
- POST /api/users/update-role
- POST /api/sentry
- PUT /api/courses/[id]
- DELETE /api/courses/[id]


## 8. Requisitos No Funcionales

- **Performance:** La aplicación debe ofrecer tiempos de carga rápidos y una navegación ágil, minimizando bloqueos de la interfaz y evitando cargas innecesarias de datos para mantener una sensación de fluidez constante.
- **Seguridad:** El acceso al contenido debe estar protegido mediante autenticación y control de permisos por rol.
- **Escalabilidad:** La arquitectura debe permitir el crecimiento del sistema (más cursos, más usuarios, más contenido) sin requerir cambios estructurales significativos.
- **Mantenibilidad:** El código debe estar organizado de forma modular y tipada para facilitar correcciones, mejoras y nuevas funcionalidades en el tiempo.
- **UX:** La interfaz debe ser clara, consistente y enfocada en el consumo de contenido, reduciendo fricción y distracciones durante la experiencia del usuario.
- **Accesibilidad:** La aplicación debe contemplar buenas prácticas de accesibilidad web, permitiendo su uso correcto con teclado y lectores de pantalla en los flujos principales.


---

## 9. Exclusiones (No incluido)

- **Sistema de pagos integrado:** La plataforma no gestiona cobros, suscripciones ni facturación. El acceso se otorga únicamente por invitación administrativa.
- **Certificados automáticos:** No se incluye generación de certificados de finalización.
- **Gamificación avanzada:** No hay sistema de puntos, badges, rankings o logros.
- **Clases en vivo integradas:** No se incluye streaming en tiempo real ni integración con herramientas de videoconferencia.
- **Multi-idioma:** La plataforma funciona en un único idioma.
- **Modo offline:** El contenido requiere conexión activa a internet.
