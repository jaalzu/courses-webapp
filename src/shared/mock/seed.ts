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
    name: "Chef Admin",
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
    name: "María García",
    avatar_url: null,
    role: "student",
    bio: "Apasionada por la gastronomía",
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
    title: "Fundamentos de Cocina Profesional",
    description:
      "Aprende las técnicas básicas que todo chef debe dominar: cortes, cocción, emplatado y organización en cocina.",
    image: "/curso1.webp",
    duration: "8",
    instructor: "Chef Roberto Silva",
    level: "beginner",
    video: "",
    keyPoints: [
      "Cortes básicos (juliana, brunoise, chiffonade)",
      "Métodos de cocción",
      "Organización mise en place",
      "Higiene y seguridad alimentaria",
    ],
    is_initial: true,
    is_published: true,
    created_at: now,
    updated_at: now,
    lessons: [
      {
        id: "lesson-1-1",
        title: "Introducción a la cocina profesional",
        duration: "12",
        videoUrl: "https://www.youtube.com/watch?v=G-IY9MEFYmE",
      },
      {
        id: "lesson-1-2",
        title: "Cortes fundamentales",
        duration: "18",
        videoUrl: "https://www.youtube.com/watch?v=G-IY9MEFYmE",
      },
      {
        id: "lesson-1-3",
        title: "Métodos de cocción básicos",
        duration: "22",
        videoUrl: "https://www.youtube.com/watch?v=G-IY9MEFYmE",
      },
    ],
  },
  {
    id: "course-2",
    title: "Pastelería Francesa Clásica",
    description:
      "Domina el arte de la pastelería francesa: croissants, éclairs, macarons y técnicas de repostería fina.",
    image: "/curso3.webp",

    duration: "12",
    instructor: "Chef Ana Dubois",
    level: "intermediate",
    video: "",
    keyPoints: [
      "Masa laminada y croissants",
      "Crema pastelera y glaseados",
      "Macarons perfectos",
      "Decoración con chocolate",
    ],
    is_initial: false,
    is_published: true,
    created_at: now,
    updated_at: now,
    lessons: [
      {
        id: "lesson-2-1",
        title: "Introducción a la pastelería francesa",
        duration: "15",
        videoUrl: "https://www.youtube.com/watch?v=G-IY9MEFYmE",
      },
      {
        id: "lesson-2-2",
        title: "Masa laminada paso a paso",
        duration: "25",
        videoUrl: "https://www.youtube.com/watch?v=G-IY9MEFYmE",
      },
      {
        id: "lesson-2-3",
        title: "Macarons: técnica y rellenos",
        duration: "20",
        videoUrl: "https://www.youtube.com/watch?v=G-IY9MEFYmE",
      },
    ],
  },
  {
    id: "course-3",
    title: "Cocina Molecular Avanzada",
    description:
      "Explora técnicas de vanguardia: esferificaciones, espumas, gelificaciones y transformaciones de texturas.",
    image: "/curso2.webp",

    duration: "10",
    instructor: "Chef Diego Ferrer",
    level: "advanced",
    video: "",
    keyPoints: [
      "Esferificaciones con alginato",
      "Espumas con lecitina",
      "Gelificaciones con agar-agar",
      "Platos de autor",
    ],
    is_initial: false,
    is_published: true,
    created_at: now,
    updated_at: now,
    lessons: [
      {
        id: "lesson-3-1",
        title: "Introducción a la cocina molecular",
        duration: "14",
        videoUrl: "https://www.youtube.com/watch?v=G-IY9MEFYmE",
      },
      {
        id: "lesson-3-2",
        title: "Esferificaciones básicas",
        duration: "20",
        videoUrl: "https://www.youtube.com/watch?v=G-IY9MEFYmE",
      },
    ],
  },
];

export const SEED_FORUM_POSTS: MockForumPost[] = [
  {
    id: "post-1",
    course_id: "course-1",
    user_id: "user-student",
    title: "María García",
    content:
      "¿Alguien tiene tips para mejorar el corte juliana? Me cuesta mantener el tamaño uniforme.",
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "post-2",
    course_id: "course-1",
    user_id: "user-student-2",
    title: "Carlos Mendoza",
    content:
      "Excelente curso! La lección de mise en place cambió completamente mi forma de cocinar en casa.",
    is_pinned: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "post-3",
    course_id: "course-2",
    user_id: "user-student",
    title: "María García",
    content: "Mis macarons siempre salen agrietados. ¿Qué estoy haciendo mal?",
    is_pinned: false,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export const SEED_FORUM_COMMENTS: MockForumComment[] = [
  {
    id: "comment-1",
    post_id: "post-1",
    user_id: "user-student-2",
    content:
      "Practicá con una papa pelada primero, es más fácil. También asegurate de que el cuchillo esté bien afilado.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "comment-2",
    post_id: "post-1",
    user_id: "user-admin",
    content:
      "Tip del chef: doblá los dedos en forma de garra para protegerlos y mantener el corte uniforme.",
    created_at: new Date(Date.now() - 86400000 + 3600000).toISOString(),
  },
  {
    id: "comment-3",
    post_id: "post-3",
    user_id: "user-admin",
    content:
      "Revisá la humedad y no abras el horno durante los primeros 10 minutos. También dejá reposar la masa antes de hornear.",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
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
    comment_id: "comment-3",
    actor_id: "user-admin",
    is_read: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

export const SEED_FAVORITES: MockFavorite[] = [
  { user_id: "user-student", course_id: "course-1" },
  { user_id: "user-student", course_id: "course-2" },
];

export const SEED_COURSE_ACCESS: MockCourseAccess[] = [
  {
    id: "access-1",
    user_id: "user-student",
    course_id: "course-3",
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
