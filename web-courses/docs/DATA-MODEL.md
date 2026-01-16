# Data Model – JavaCourses

Este documento describe el modelo de datos inicial de la plataforma **JavaCourses**, un LMS privado de acceso controlado para mentoría profesional.

> ⚠️ Nota: Este esquema describe la estructura lógica de los datos.  
> No representa necesariamente el orden de creación ni el SQL ejecutable final.

---


## Diagrama de Relaciones (Esquema General)

auth.users
└── id (uuid)
    │
    └── profiles
        ├── id (uuid, PK, FK → auth.users.id)
        ├── email (text)
        ├── name (text)
        ├── avatar_url (text)
        ├── bio (text)
        ├── role (text)
        ├── created_at (timestamptz)
        └── updated_at (timestamptz)
            │
            ├── forum_posts
            │   ├── id (uuid)
            │   ├── course_id (uuid, FK → courses.id)
            │   ├── lesson_id (uuid, FK → lessons.id)
            │   ├── user_id (uuid, FK → profiles.id)
            │   ├── title (text)
            │   ├── content (text)
            │   ├── is_pinned (boolean)
            │   ├── created_at (timestamptz)
            │   └── updated_at (timestamptz)
            │       │
            │       └── forum_comments
            │           ├── id (uuid)
            │           ├── post_id (uuid, FK → forum_posts.id)
            │           ├── user_id (uuid, FK → profiles.id)
            │           ├── content (text)
            │           ├── created_at (timestamptz)
            │           └── updated_at (timestamptz)
            │
            ├── favorites
            │   ├── id (uuid)
            │   ├── user_id (uuid, FK → auth.users.id)
            │   ├── course_id (uuid, FK → courses.id)
            │   └── created_at (timestamptz)
            │
            └── user_progress
                ├── id (uuid)
                ├── user_id (uuid, FK → auth.users.id)
                ├── course_id (uuid, FK → courses.id)
                ├── lesson_id (uuid, FK → lessons.id)
                ├── status (text)
                ├── completed_at (timestamptz)
                ├── created_at (timestamptz)
                └── updated_at (timestamptz)

courses
├── id (uuid)
├── title (text)
├── description (text)
├── instructor (text)
├── thumbnail_url (text)
├── difficulty (text)
├── duration (text)
├── category (text)
├── tags (text[])
├── key_points (text[])
├── is_published (boolean)
├── created_at (timestamptz)
└── updated_at (timestamptz)
    │
    └── lessons
        ├── id (uuid)
        ├── course_id (uuid, FK → courses.id)
        ├── title (text)
        ├── description (text)
        ├── content (text)
        ├── video_url (text)
        ├── duration (text)
        ├── order_index (int)
        ├── is_published (boolean)
        ├── created_at (timestamptz)
        └── updated_at (timestamptz)


---

## Visión General

El sistema se compone de las siguientes entidades principales:

- **Usuarios** (auth.users + profiles)
- **Cursos y Lecciones**
- **Progreso del Usuario**
- **Favoritos**
- **Foro (Posts y Comentarios)**

La autenticación es gestionada por **Supabase Auth**, mientras que la autorización y los datos de dominio viven en el esquema público.

---

## User (auth.users)

Entidad gestionada por Supabase Auth.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| id | uuid | Identificador único del usuario |
| email | text | Email de autenticación |
| password | — | Gestionado internamente por Supabase |

---

## Profiles

Extiende la información del usuario autenticado.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| id | uuid | FK → auth.users.id |
| email | text | Email del usuario (único) |
| name | text | Nombre visible del usuario |
| avatar_url | text | URL del avatar |
| bio | text | Biografía corta |
| role | text | Rol del usuario (`student`, `instructor`, `admin`) |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última actualización |

**Relaciones:**
- 1 Profile pertenece a 1 User.
- Un Profile puede crear múltiples posts y comentarios.

---

## Courses

Representa un curso dentro de la plataforma.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| id | uuid | Identificador del curso |
| title | text | Título del curso |
| description | text | Descripción general |
| instructor | text | Nombre del instructor |
| thumbnail_url | text | Imagen del curso |
| difficulty | text | `beginner`, `intermediate`, `advanced` |
| duration | text | Duración estimada |
| category | text | Categoría del curso |
| tags | text[] | Etiquetas asociadas |
| key_points | text[] | Puntos clave del curso |
| is_published | boolean | Visibilidad del curso |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última actualización |

**Relaciones:**
- Un Course tiene muchas Lessons.
- Un Course puede tener posts en el foro.
- Un Course puede estar en favoritos de varios usuarios.

---

## Lessons

Lecciones individuales asociadas a un curso.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| id | uuid | Identificador de la lección |
| course_id | uuid | FK → courses.id |
| title | text | Título de la lección |
| description | text | Descripción breve |
| content | text | Contenido textual |
| video_url | text | URL del video |
| duration | text | Duración estimada |
| order_index | int | Orden dentro del curso |
| is_published | boolean | Visibilidad |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última actualización |

**Relaciones:**
- Una Lesson pertenece a un Course.
- Una Lesson puede tener posts asociados en el foro.
- Una Lesson participa en el progreso del usuario.

---

## UserProgress

Registra el avance del usuario en cada lección.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| id | uuid | Identificador |
| user_id | uuid | FK → auth.users.id |
| course_id | uuid | FK → courses.id |
| lesson_id | uuid | FK → lessons.id |
| status | text | `not_started`, `in_progress`, `completed` |
| completed_at | timestamptz | Fecha de finalización |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última actualización |

**Relaciones:**
- Un User tiene muchos registros de progreso.
- Cada registro corresponde a una Lesson específica.

---

## Favorites

Cursos marcados como favoritos por el usuario.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| id | uuid | Identificador |
| user_id | uuid | FK → auth.users.id |
| course_id | uuid | FK → courses.id |
| created_at | timestamptz | Fecha de creación |

**Relaciones:**
- Un User puede marcar muchos cursos como favoritos.
- Un Course puede ser favorito de muchos usuarios.

---

## ForumPosts

Publicaciones dentro del foro de la plataforma.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| id | uuid | Identificador |
| course_id | uuid | FK → courses.id (opcional) |
| lesson_id | uuid | FK → lessons.id (opcional) |
| user_id | uuid | FK → profiles.id |
| title | text | Título del post |
| content | text | Contenido |
| is_pinned | boolean | Post fijado |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última actualización |

**Relaciones:**
- Un Post pertenece a un User.
- Un Post puede estar asociado a un Course o Lesson.
- Un Post tiene múltiples comentarios.

---

## ForumComments

Comentarios asociados a un post del foro.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| id | uuid | Identificador |
| post_id | uuid | FK → forum_posts.id |
| user_id | uuid | FK → profiles.id |
| content | text | Contenido del comentario |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última actualización |

**Relaciones:**
- Un Comment pertenece a un Post.
- Un User puede crear múltiples comentarios.

---

## Consideraciones de Diseño

- El modelo prioriza **acceso controlado al contenido**.
- La autorización se gestiona a nivel de datos, no en el frontend.
- El sistema está preparado para crecer sin introducir pagos o planes.
- El uso de UUIDs permite escalabilidad y distribución futura.

---
