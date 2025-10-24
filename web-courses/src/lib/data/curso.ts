export interface Timestamp {
  time: string      // Formato "MM:SS" ej: "02:15"
  seconds: number   // Segundos totales para el salto
  label: string     // Descripción del momento
}

export interface Lesson {
  id: number
  title: string
  duration: string
  completed: boolean       // Siempre presente
  timestamps?: Timestamp[] // Momentos clave de la lección
}

export interface Course {
  id: number
  title: string
  description: string
  duration: string
  video: string
  instructor?: string       // Opcional
  level?: 'beginner' | 'intermediate' | 'advanced'
  lessons: Lesson[]
  image: string
}

export const courses: Course[] = [
  {
    id: 1,
    title: "React desde cero: crea interfaces modernas",
    description: "Aprende React paso a paso desde los fundamentos hasta la creación de componentes avanzados, hooks y buenas prácticas. Ideal para construir proyectos reales con un enfoque moderno.",
    image: "/curso1.jpg",
    duration: "3h 45m",
    video: "https://www.youtube.com/embed/dGcsHMXbSOA",
    level: 'beginner',
    instructor: "Juan Pérez",
    lessons: [
      { 
        id: 1, title: "Introducción al curso", duration: "3:20", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Bienvenida" },
          { time: "01:30", seconds: 90, label: "Qué aprenderás" },
          { time: "02:45", seconds: 165, label: "Requisitos previos" }
        ]
      },
      { 
        id: 2, title: "¿Qué es React?", duration: "7:45", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Historia de React" },
          { time: "02:00", seconds: 120, label: "Virtual DOM" },
          { time: "04:30", seconds: 270, label: "Comparación con otros frameworks" },
          { time: "06:15", seconds: 375, label: "Casos de uso" }
        ]
      },
      { 
        id: 3, title: "JSX y componentes", duration: "10:30", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "¿Qué es JSX?" },
          { time: "02:30", seconds: 150, label: "Sintaxis básica" },
          { time: "05:00", seconds: 300, label: "Componentes funcionales" },
          { time: "07:45", seconds: 465, label: "Props básicas" }
        ]
      },
      { 
        id: 4, title: "Props y estado", duration: "9:10", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Diferencia entre props y state" },
          { time: "02:15", seconds: 135, label: "Pasar props entre componentes" },
          { time: "05:30", seconds: 330, label: "useState hook" },
          { time: "07:00", seconds: 420, label: "Ejemplo práctico" }
        ]
      },
      { 
        id: 5, title: "Proyecto final", duration: "25:00", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Presentación del proyecto" },
          { time: "03:00", seconds: 180, label: "Estructura de carpetas" },
          { time: "08:00", seconds: 480, label: "Componentes principales" },
          { time: "15:00", seconds: 900, label: "Estado global" },
          { time: "20:00", seconds: 1200, label: "Deploy" }
        ]
      },
    ],
  },
  {
    id: 2,
    title: "Next.js avanzado: rutas, SSR y API Routes",
    description: "Domina Next.js creando aplicaciones dinámicas con Server Side Rendering, rutas protegidas y conexión a APIs modernas.",
    image: "/curso2.jpg",
    duration: "4h 10m",
    video: "https://www.youtube.com/embed/Tn6-PIqc4UM",
    level: 'advanced',
    instructor: "María González",
    lessons: [
      { 
        id: 1, title: "Introducción", duration: "5:15", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Overview del curso" },
          { time: "02:00", seconds: 120, label: "Setup del proyecto" },
          { time: "04:00", seconds: 240, label: "Estructura de Next.js" }
        ]
      },
      { 
        id: 2, title: "Páginas y rutas dinámicas", duration: "12:40", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Sistema de routing" },
          { time: "03:30", seconds: 210, label: "Rutas dinámicas [id]" },
          { time: "07:00", seconds: 420, label: "Catch-all routes" },
          { time: "10:00", seconds: 600, label: "Link component" }
        ]
      },
      { 
        id: 3, title: "SSR y SSG", duration: "15:00", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "¿Qué es SSR?" },
          { time: "04:00", seconds: 240, label: "getServerSideProps" },
          { time: "08:00", seconds: 480, label: "¿Qué es SSG?" },
          { time: "11:00", seconds: 660, label: "getStaticProps" },
          { time: "13:00", seconds: 780, label: "ISR - Regeneración incremental" }
        ]
      },
      { 
        id: 4, title: "API Routes", duration: "14:20", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Intro a API Routes" },
          { time: "02:30", seconds: 150, label: "Crear primera API" },
          { time: "06:00", seconds: 360, label: "Métodos HTTP" },
          { time: "10:00", seconds: 600, label: "Middleware" },
          { time: "12:30", seconds: 750, label: "Autenticación" }
        ]
      },
    ],
  },
]
