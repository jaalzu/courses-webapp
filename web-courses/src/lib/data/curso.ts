export interface Lesson {
  id: number
  title: string
  duration: string
}

export interface Course {
  id: number
  title: string
  description: string
  duration: string
  video: string
  lessons: Lesson[]
}

export const courses: Course[] = [
  {
    id: 1,
    title: "React desde cero: crea interfaces modernas",
    description:
      "Aprende React paso a paso desde los fundamentos hasta la creación de componentes avanzados, hooks y buenas prácticas. Ideal para construir proyectos reales con un enfoque moderno.",
    duration: "3h 45m",
    video: "https://www.youtube.com/embed/dGcsHMXbSOA",
    lessons: [
      { id: 1, title: "Introducción al curso", duration: "3:20" },
      { id: 2, title: "¿Qué es React?", duration: "7:45" },
      { id: 3, title: "JSX y componentes", duration: "10:30" },
      { id: 4, title: "Props y estado", duration: "9:10" },
      { id: 5, title: "Proyecto final", duration: "25:00" },
    ],
  },
  {
    id: 2,
    title: "Next.js avanzado: rutas, SSR y API Routes",
    description:
      "Domina Next.js creando aplicaciones dinámicas con Server Side Rendering, rutas protegidas y conexión a APIs modernas.",
    duration: "4h 10m",
    video: "https://www.youtube.com/embed/Tn6-PIqc4UM",
    lessons: [
      { id: 1, title: "Introducción", duration: "5:15" },
      { id: 2, title: "Páginas y rutas dinámicas", duration: "12:40" },
      { id: 3, title: "SSR y SSG", duration: "15:00" },
      { id: 4, title: "API Routes", duration: "14:20" },
    ],
  },
]
