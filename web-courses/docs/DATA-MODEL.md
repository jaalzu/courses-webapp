# 📊 Data Model: JavaCourses Platform

Este documento define la estructura de datos para la plataforma educativa JavaCourses, integrando las definiciones de TypeScript y el esquema relacional de Supabase.

## 1. Diagrama de Entidad-Relación (ERD)

Este esquema visualiza las conexiones entre usuarios, contenido educativo y herramientas de comunidad.

```mermaid
erDiagram
    profiles ||--o{ courses : "instructor_id"
    profiles ||--o{ user_progress : "user_id"
    profiles ||--o{ favorites : "user_id"
    profiles ||--o{ forum_posts : "user_id"
    profiles ||--o{ forum_comments : "user_id"

    courses ||--|{ lessons : "contiene"
    courses ||--o{ user_progress : "course_id"
    courses ||--o{ favorites : "course_id"
    courses ||--o{ forum_posts : "course_id"

    lessons ||--o{ user_progress : "lesson_id"
    lessons ||--o{ forum_posts : "lesson_id"

    forum_posts ||--|{ forum_comments : "post_id"

    profiles {
        uuid id PK
        text email
        text name
        text avatar_url
        text bio
        text role
        timestamptz created_at
        timestamptz updated_at
    }

    courses {
        uuid id PK
        text title
        text description
        text instructor
        uuid instructor_id FK
        text thumbnail_url
        text difficulty
        float8 duration
        text category
        _text tags
        bool is_published
        timestamptz created_at
        timestamptz updated_at
        _text key_points
    }

    lessons {
        uuid id PK
        uuid course_id FK
        text title
        text description
        text content
        text video_url
        float8 duration
        int4 order_index
        bool is_published
        timestamptz created_at
        timestamptz updated_at
    }

    user_progress {
        uuid id PK
        uuid user_id FK
        uuid course_id FK
        uuid lesson_id FK
        text status
        timestamptz completed_at
        timestamptz created_at
        timestamptz updated_at
    }

    favorites {
        uuid id PK
        uuid user_id FK
        uuid course_id FK
        timestamptz created_at
    }

    forum_posts {
        uuid id PK
        text title
        text content
        uuid user_id FK
        uuid course_id FK
        uuid lesson_id FK
        bool is_pinned
        timestamptz created_at
        timestamptz updated_at
    }

    forum_comments {
        uuid id PK
        uuid post_id FK
        uuid user_id FK
        text content
        timestamptz created_at
        timestamptz updated_at
    }