import type { Course } from "@/entities/course/types";

export interface MockProfile {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar_url: string | null;
  role: "student" | "admin";
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface MockForumPost {
  id: string;
  course_id: string;
  user_id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
}

export interface MockForumComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface MockProgress {
  user_id: string;
  course_id: string;
  lesson_id: string;
  status: "not_started" | "in_progress" | "completed";
  completed_at?: string;
  updated_at: string;
}

export interface MockNotification {
  id: string;
  user_id: string;
  type: "post_comment" | "thread_reply" | "direct_reply";
  post_id: string;
  comment_id: string | null;
  actor_id: string;
  is_read: boolean;
  created_at: string;
}

export interface MockFavorite {
  user_id: string;
  course_id: string;
}

export interface MockCourseAccess {
  id: string;
  user_id: string;
  course_id: string;
  granted_by: string | null;
  granted_at: string;
}

export interface MockStoreData {
  profiles: MockProfile[];
  courses: Course[];
  forumPosts: MockForumPost[];
  forumComments: MockForumComment[];
  progress: MockProgress[];
  notifications: MockNotification[];
  favorites: MockFavorite[];
  courseAccess: MockCourseAccess[];
}

const now = new Date().toISOString();

export const SEED_PROFILES: MockProfile[] = [
  {
    id: "user-admin",
    email: "admin@demo.com",
    password: "pepe321",
    name: "Admin Dev",
    avatar_url: null,
    role: "admin",
    bio: "Administrador de la plataforma",
    created_at: now,
    updated_at: now,
  },
  {
    id: "user-student",
    email: "student@demo.com",
    password: "student123",
    name: "Juan Pérez",
    avatar_url: null,
    role: "student",
    bio: "Apasionado por el desarrollo web",
    created_at: now,
    updated_at: now,
  },
  {
    id: "user-student-2",
    email: "carlos@demo.com",
    password: "carlos123",
    name: "Carlos Mendoza",
    avatar_url: null,
    role: "student",
    bio: null,
    created_at: now,
    updated_at: now,
  },
];

export const SEED_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Introducción a JavaScript",
    description:
      "Aprende los fundamentos de JavaScript: variables, tipos de datos, funciones, objetos y manipulación del DOM. Perfecto para principiantes que quieren comenzar su carrera en desarrollo web.",
    image: "/curso1.webp",
    duration: "38",
    instructor: "Carlos Ruiz",
    level: "beginner",
    video: "",
    keyPoints: [
      "Variables y tipos de datos",
      "Funciones y scope",
      "Objetos y arrays",
      "DOM y eventos",
      "ES6+ Basics",
    ],
    is_initial: true,
    is_published: true,
    created_at: now,
    updated_at: now,
    lessons: [
      {
        id: "lesson-1-1",
        title: "Variables y tipos de datos",
        duration: "10",
        videoUrl: "https://www.youtube.com/watch?v=jS4aFq5-91M",
      },
      {
        id: "lesson-1-2",
        title: "Operadores y control de flujo",
        duration: "12",
        videoUrl: "https://www.youtube.com/watch?v=IsG4Xd6LlsM",
      },
      {
        id: "lesson-1-3",
        title: "Funciones fundamentales",
        duration: "8",
        videoUrl: "https://www.youtube.com/watch?v=gigtS_5KOqo",
      },
    ],
  },
  {
    id: "course-2",
    title: "React desde cero",
    description:
      "Domina React desde lo básico: componentes, hooks, state management y enrutamiento. Construye aplicaciones web modernas y escalables con la librería más popular del momento.",
    image: "/curso2.webp",
    duration: "23",
    instructor: "María García",
    level: "intermediate",
    video: "",
    keyPoints: [
      "Componentes funcionales",
      "Hooks (useState, useEffect)",
      "Props y composición",
      "Router y navegación",
      "State management con Zustand",
    ],
    is_initial: false,
    is_published: true,
    created_at: now,
    updated_at: now,
    lessons: [
      {
        id: "lesson-2-1",
        title: "Qué es React y por qué usarlo",
        duration: "5",
        videoUrl: "https://www.youtube.com/watch?v=4UZrsTqkcW4",
      },
      {
        id: "lesson-2-2",
        title: "Componentes y JSX",
        duration: "7",
        videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
      },
      {
        id: "lesson-2-3",
        title: "Hooks: useState y useEffect",
        duration: "6",
        videoUrl: "https://www.youtube.com/watch?v=xnqTKOVMN-c",
      },
      {
        id: "lesson-2-4",
        title: "Enrutamiento con React Router",
        duration: "5",
        videoUrl: "https://www.youtube.com/watch?v=cP_C95ZjVyE",
      },
    ],
  },
  {
    id: "course-3",
    title: "TypeScript Avanzado",
    description:
      "Lleva tus habilidades de TypeScript al siguiente nivel. Tipos genéricos, decoradores, tipos condicionales y más. Ideal para desarrolladores que quieren escribir código robusto y mantenible.",
    image: "/curso3.webp",
    duration: "13",
    instructor: "Diego Ferrer",
    level: "advanced",
    video: "",
    keyPoints: [
      "Tipos genéricos",
      "Interfaces y tipos complejos",
      "Decoradores y metaprogramming",
      "Tipos condicionales",
      "Utility types avanzados",
    ],
    is_initial: false,
    is_published: true,
    created_at: now,
    updated_at: now,
    lessons: [
      {
        id: "lesson-3-1",
        title: "Repaso de tipos básicos",
        duration: "3",
        videoUrl: "https://www.youtube.com/watch?v=BwuLSZ8KCC8",
      },
      {
        id: "lesson-3-2",
        title: "Genéricos y tipos parametrizados",
        duration: "4",
        videoUrl: "https://www.youtube.com/watch?v=nViEqpgwxHE",
      },
      {
        id: "lesson-3-3",
        title: "Tipos condicionales e inferencia",
        duration: "3",
        videoUrl: "https://www.youtube.com/watch?v=gKZCSVMHJbc",
      },
      {
        id: "lesson-3-4",
        title: "Decoradores y metaprogramming",
        duration: "3",
        videoUrl: "https://www.youtube.com/watch?v=0EmyyW06M6c",
      },
    ],
  },
  {
    id: "course-4",
    title: "Next.js Full Stack",
    description:
      "Crea aplicaciones full-stack completas con Next.js. Desde el frontend hasta APIs serverless. Aprende renderizado en servidor, optimización y despliegue en producción.",
    image: "/curso4.webp",
    duration: "19",
    instructor: "Ana López",
    level: "advanced",
    video: "",
    keyPoints: [
      "App Router y SSR",
      "API Routes y serverless",
      "Optimización de imágenes",
      "Autenticación y middleware",
      "Despliegue en Vercel",
    ],
    is_initial: false,
    is_published: true,
    created_at: now,
    updated_at: now,
    lessons: [
      {
        id: "lesson-4-1",
        title: "Setup y estructura del proyecto",
        duration: "4",
        videoUrl: "https://www.youtube.com/watch?v=ckzH6sDYGUE",
      },
      {
        id: "lesson-4-2",
        title: "App Router y renderizado",
        duration: "5",
        videoUrl: "https://www.youtube.com/watch?v=THO2c5-NhWQ",
      },
      {
        id: "lesson-4-3",
        title: "Creación de APIs con Route Handlers",
        duration: "5",
        videoUrl: "https://www.youtube.com/watch?v=PVvxQKoMHnE",
      },
      {
        id: "lesson-4-4",
        title: "Despliegue y optimización",
        duration: "5",
        videoUrl: "https://www.youtube.com/watch?v=W0Lfph-EXQY",
      },
    ],
  },
  {
    id: "course-5",
    title: "Web Development Profesional",
    description:
      "Conviértete en un desarrollador web profesional. Mejores prácticas, patrones de diseño, testing, y herramientas de desarrollo. Todo lo que necesitas para trabajar en equipos reales.",
    image: "/curso1.webp",
    duration: "19",
    instructor: "Roberto Silva",
    level: "advanced",
    video: "",
    keyPoints: [
      "Clean Code y arquitectura",
      "Testing (unit, integration, e2e)",
      "Git y control de versiones",
      "DevOps y CI/CD",
      "Buenas prácticas de seguridad",
    ],
    is_initial: false,
    is_published: true,
    created_at: now,
    updated_at: now,
    lessons: [
      {
        id: "lesson-5-1",
        title: "Principios de código limpio",
        duration: "4",
        videoUrl: "https://www.youtube.com/watch?v=uQYzb_DsNg8",
      },
      {
        id: "lesson-5-2",
        title: "Testing en JavaScript",
        duration: "5",
        videoUrl: "https://www.youtube.com/watch?v=GLLpUKFEHFE",
      },
      {
        id: "lesson-5-3",
        title: "Control de versiones y Git",
        duration: "5",
        videoUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
      },
      {
        id: "lesson-5-4",
        title: "Despliegue y prácticas DevOps",
        duration: "5",
        videoUrl: "https://www.youtube.com/watch?v=YNa2lje2sPE",
      },
    ],
  },
];

export const SEED_FORUM_POSTS: MockForumPost[] = [
  // JavaScript
  {
    id: "post-1",
    course_id: "course-1",
    user_id: "user-student",
    title: "Juan Pérez",
    content:
      "¿Cuál es la diferencia entre var, let y const? Me cuesta entender cuándo usar cada una.",
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "post-2",
    course_id: "course-1",
    user_id: "user-student-2",
    title: "Carlos Mendoza",
    content:
      "Excelente introducción a JavaScript. Muy clara la explicación de scope y closure.",
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "post-3",
    course_id: "course-1",
    user_id: "user-student",
    title: "Juan Pérez",
    content:
      "¿Alguien sabe cómo trabajar mejor con arrays? Callback vs arrow functions confunde un poco.",
    is_pinned: false,
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
  // React
  {
    id: "post-4",
    course_id: "course-2",
    user_id: "user-student-2",
    title: "Carlos Mendoza",
    content:
      "¿Cuándo usar useCallback vs useMemo? Hay momentos donde uno es mejor que el otro?",
    is_pinned: false,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "post-5",
    course_id: "course-2",
    user_id: "user-student",
    title: "Juan Pérez",
    content:
      "Estoy confundido con las dependencias en useEffect. A veces se ejecuta cuando no quiero.",
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "post-6",
    course_id: "course-2",
    user_id: "user-student-2",
    title: "Carlos Mendoza",
    content:
      "El patrón de componentes render props es muy útil. ¿Hay alternativas modernas?",
    is_pinned: false,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  // TypeScript
  {
    id: "post-7",
    course_id: "course-3",
    user_id: "user-student",
    title: "Juan Pérez",
    content:
      "Tengo dudas con los tipos genéricos en TypeScript. ¿Alguien tiene un ejemplo práctico?",
    is_pinned: false,
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "post-8",
    course_id: "course-3",
    user_id: "user-student-2",
    title: "Carlos Mendoza",
    content:
      "Los utility types son poderosos pero complicados. ¿Cuáles usáis más a menudo?",
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  // Next.js
  {
    id: "post-9",
    course_id: "course-4",
    user_id: "user-student",
    title: "Juan Pérez",
    content:
      "¿Cómo optimizar las imágenes en Next.js? El componente Image a veces no carga bien.",
    is_pinned: false,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "post-10",
    course_id: "course-4",
    user_id: "user-student-2",
    title: "Carlos Mendoza",
    content: "App Router vs Pages Router: ¿cuál elegir para proyectos nuevos?",
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  // Professional
  {
    id: "post-11",
    course_id: "course-5",
    user_id: "user-student",
    title: "Juan Pérez",
    content: "¿Qué herramientas de testing recomendáis? Jest vs Vitest?",
    is_pinned: false,
    created_at: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: "post-12",
    course_id: "course-5",
    user_id: "user-student-2",
    title: "Carlos Mendoza",
    content:
      "Las prácticas de seguridad son cruciales. ¿Cuáles son las más importantes?",
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const SEED_FORUM_COMMENTS: MockForumComment[] = [
  // JavaScript comments
  {
    id: "comment-1",
    post_id: "post-1",
    user_id: "user-student-2",
    content:
      "var es antiguo y tiene hoisting confuso. Usa let y const: let para variables que cambian, const para lo demás.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "comment-2",
    post_id: "post-1",
    user_id: "user-admin",
    content:
      "Tip: En código moderno, usa const por defecto. Solo usa let si necesitas reasignar. Evita var completamente.",
    created_at: new Date(Date.now() - 86400000 + 3600000).toISOString(),
  },
  {
    id: "comment-3",
    post_id: "post-3",
    user_id: "user-admin",
    content:
      "Tanto callbacks como arrow functions funcionan, pero arrow functions tienen mejor legibilidad. Usa .map(), .filter(), .reduce() siempre que puedas.",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "comment-4",
    post_id: "post-3",
    user_id: "user-student-2",
    content:
      "Yo uso arrow functions porque el contexto de `this` es más predecible. ¡Mucho más fácil!",
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  // React comments
  {
    id: "comment-5",
    post_id: "post-4",
    user_id: "user-admin",
    content:
      "useCallback evita re-crear funciones, useMemo evita re-ejecutar cálculos. Úsalos solo si realmente afectan performance.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "comment-6",
    post_id: "post-5",
    user_id: "user-admin",
    content:
      "Las dependencias en useEffect son clave. Si necesitas que se ejecute solo una vez, usa un array vacío [].",
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "comment-7",
    post_id: "post-5",
    user_id: "user-student-2",
    content:
      "A mí también me confundió al principio. Te ayuda pensar: ¿en qué momento quiero que esto se ejecute de nuevo?",
    created_at: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: "comment-8",
    post_id: "post-6",
    user_id: "user-admin",
    content:
      "Los Hooks (custom hooks) son la alternativa moderna. Mucho más limpio que render props.",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  // TypeScript comments
  {
    id: "comment-9",
    post_id: "post-7",
    user_id: "user-admin",
    content:
      "Los genéricos te permiten reutilizar código para múltiples tipos. Ejemplo: function obtener<T>(arr: T[]): T { return arr[0]; }",
    created_at: new Date(Date.now() - 259200000 + 3600000).toISOString(),
  },
  {
    id: "comment-10",
    post_id: "post-8",
    user_id: "user-admin",
    content:
      "Partial, Omit, y Pick son los que más uso. Son verdaderas vidas salvadoras para reutilizar types.",
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
  // Next.js comments
  {
    id: "comment-11",
    post_id: "post-9",
    user_id: "user-admin",
    content:
      "Usa el componente Image de Next.js, detecta automáticamente formatos modernos y redimensiona. Siempre pon width y height.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "comment-12",
    post_id: "post-10",
    user_id: "user-admin",
    content:
      "App Router es el futuro. Pages Router está en mantenimiento. Usa App Router para proyectos nuevos.",
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
  // Professional comments
  {
    id: "comment-13",
    post_id: "post-11",
    user_id: "user-admin",
    content:
      "Vitest es más rápido y moderno. Jest es la referencia pero Vitest lo supera en velocidad.",
    created_at: new Date(Date.now() - 216000000).toISOString(),
  },
  {
    id: "comment-14",
    post_id: "post-12",
    user_id: "user-admin",
    content:
      "XSS, CSRF, SQL Injection son lo básico. Siempre valida inputs, usa HTTPS, y nunca confíes en el cliente.",
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "comment-15",
    post_id: "post-12",
    user_id: "user-student-2",
    content:
      "Gracias por la claridad. A veces olvidamos estos conceptos en la prisa de desarrollar.",
    created_at: new Date(Date.now() - 21600000).toISOString(),
  },
];

export const SEED_PROGRESS: MockProgress[] = [
  {
    user_id: "user-student",
    course_id: "course-1",
    lesson_id: "lesson-1-1",
    status: "completed",
    completed_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    user_id: "user-student",
    course_id: "course-1",
    lesson_id: "lesson-1-2",
    status: "completed",
    completed_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    user_id: "user-student",
    course_id: "course-2",
    lesson_id: "lesson-2-1",
    status: "in_progress",
    updated_at: new Date().toISOString(),
  },
  {
    user_id: "user-student-2",
    course_id: "course-1",
    lesson_id: "lesson-1-1",
    status: "completed",
    completed_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const SEED_NOTIFICATIONS: MockNotification[] = [
  {
    id: "notif-1",
    user_id: "user-student",
    type: "post_comment",
    post_id: "post-1",
    comment_id: "comment-2",
    actor_id: "user-admin",
    is_read: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "notif-2",
    user_id: "user-student",
    type: "direct_reply",
    post_id: "post-3",
    comment_id: "comment-4",
    actor_id: "user-student-2",
    is_read: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "notif-3",
    user_id: "user-student-2",
    type: "post_comment",
    post_id: "post-5",
    comment_id: "comment-7",
    actor_id: "user-student",
    is_read: true,
    created_at: new Date(Date.now() - 21600000).toISOString(),
  },
];

export const SEED_FAVORITES: MockFavorite[] = [
  { user_id: "user-student", course_id: "course-1" },
  { user_id: "user-student", course_id: "course-2" },
  { user_id: "user-student-2", course_id: "course-3" },
  { user_id: "user-student-2", course_id: "course-1" },
];

export const SEED_COURSE_ACCESS: MockCourseAccess[] = [
  {
    id: "access-1",
    user_id: "user-student",
    course_id: "course-4",
    granted_by: "user-admin",
    granted_at: now,
  },
  {
    id: "access-2",
    user_id: "user-student-2",
    course_id: "course-5",
    granted_by: "user-admin",
    granted_at: now,
  },
];

export function createSeedData(): MockStoreData {
  return {
    profiles: structuredClone(SEED_PROFILES),
    courses: structuredClone(SEED_COURSES),
    forumPosts: structuredClone(SEED_FORUM_POSTS),
    forumComments: structuredClone(SEED_FORUM_COMMENTS),
    progress: structuredClone(SEED_PROGRESS),
    notifications: structuredClone(SEED_NOTIFICATIONS),
    favorites: structuredClone(SEED_FAVORITES),
    courseAccess: structuredClone(SEED_COURSE_ACCESS),
  };
}
