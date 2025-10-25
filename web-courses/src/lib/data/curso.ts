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
  {
    id: 3,
    title: "Node.js y Express: Backend desde cero",
    description: "Domina el desarrollo backend con Node.js y Express. Aprende a crear APIs RESTful, autenticación, bases de datos y deploy. Perfecto para convertirte en fullstack developer.",
    image: "/curso3.jpg",
    duration: "4h 20m",
    video: "https://www.youtube.com/embed/1hpc70_OoAg",
    level: 'intermediate',
    instructor: "Carlos Rodríguez",
    lessons: [
      { 
        id: 1, title: "Introducción a Node.js", duration: "5:15", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "¿Qué es Node.js?" },
          { time: "01:45", seconds: 105, label: "Event Loop explicado" },
          { time: "03:30", seconds: 210, label: "Instalación y setup" }
        ]
      },
      { 
        id: 2, title: "Express.js fundamentals", duration: "12:30", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "¿Qué es Express?" },
          { time: "02:00", seconds: 120, label: "Primer servidor" },
          { time: "05:30", seconds: 330, label: "Routing básico" },
          { time: "08:45", seconds: 525, label: "Middlewares" },
          { time: "10:30", seconds: 630, label: "Manejo de errores" }
        ]
      },
      { 
        id: 3, title: "APIs RESTful", duration: "15:45", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Principios REST" },
          { time: "03:00", seconds: 180, label: "Métodos HTTP" },
          { time: "06:30", seconds: 390, label: "CRUD completo" },
          { time: "11:00", seconds: 660, label: "Validación de datos" },
          { time: "13:30", seconds: 810, label: "Testing con Postman" }
        ]
      },
      { 
        id: 4, title: "MongoDB y Mongoose", duration: "18:20", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Introducción a MongoDB" },
          { time: "04:00", seconds: 240, label: "Mongoose setup" },
          { time: "08:30", seconds: 510, label: "Schemas y Models" },
          { time: "12:00", seconds: 720, label: "Queries avanzadas" },
          { time: "15:30", seconds: 930, label: "Relaciones entre documentos" }
        ]
      },
      { 
        id: 5, title: "Autenticación JWT", duration: "14:30", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "¿Qué es JWT?" },
          { time: "02:30", seconds: 150, label: "Bcrypt para passwords" },
          { time: "06:00", seconds: 360, label: "Login y Register" },
          { time: "10:00", seconds: 600, label: "Middleware de autenticación" },
          { time: "12:30", seconds: 750, label: "Refresh tokens" }
        ]
      },
      { 
        id: 6, title: "Deploy en producción", duration: "10:00", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Variables de entorno" },
          { time: "02:30", seconds: 150, label: "Deploy en Railway" },
          { time: "05:00", seconds: 300, label: "MongoDB Atlas" },
          { time: "07:30", seconds: 450, label: "Testing en producción" }
        ]
      },
    ],
  },
  {
    id: 4,
    title: "TypeScript: JavaScript con superpoderes",
    description: "Lleva tu JavaScript al siguiente nivel con TypeScript. Aprende tipado estático, interfaces, generics y cómo aplicarlo en proyectos React y Node.js para código más robusto y mantenible.",
    image: "/curso4.webp",
    duration: "3h 10m",
    video: "https://www.youtube.com/embed/BwuLxPH8IDs",
    level: 'intermediate',
    instructor: "Ana Martínez",
    lessons: [
      { 
        id: 1, title: "¿Por qué TypeScript?", duration: "6:30", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Problemas de JavaScript" },
          { time: "02:00", seconds: 120, label: "Ventajas del tipado" },
          { time: "04:15", seconds: 255, label: "TypeScript vs JavaScript" },
          { time: "05:30", seconds: 330, label: "Setup inicial" }
        ]
      },
      { 
        id: 2, title: "Tipos básicos", duration: "11:45", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "string, number, boolean" },
          { time: "02:30", seconds: 150, label: "Arrays y tuplas" },
          { time: "05:00", seconds: 300, label: "any, unknown, never" },
          { time: "07:30", seconds: 450, label: "Union types" },
          { time: "09:45", seconds: 585, label: "Type aliases" }
        ]
      },
      { 
        id: 3, title: "Interfaces y tipos avanzados", duration: "13:20", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Interfaces básicas" },
          { time: "03:30", seconds: 210, label: "Propiedades opcionales" },
          { time: "06:00", seconds: 360, label: "Extending interfaces" },
          { time: "09:00", seconds: 540, label: "Type vs Interface" },
          { time: "11:30", seconds: 690, label: "Intersection types" }
        ]
      },
      { 
        id: 4, title: "Generics y utilidades", duration: "15:00", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "¿Qué son los generics?" },
          { time: "04:00", seconds: 240, label: "Funciones genéricas" },
          { time: "08:00", seconds: 480, label: "Clases genéricas" },
          { time: "11:00", seconds: 660, label: "Utility types: Partial, Pick, Omit" },
          { time: "13:30", seconds: 810, label: "Record y ReadOnly" }
        ]
      },
      { 
        id: 5, title: "TypeScript con React", duration: "16:30", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Setup React + TypeScript" },
          { time: "03:00", seconds: 180, label: "Tipar componentes" },
          { time: "06:30", seconds: 390, label: "Props e interfaces" },
          { time: "10:00", seconds: 600, label: "Hooks tipados" },
          { time: "13:30", seconds: 810, label: "Context API con TypeScript" }
        ]
      },
      { 
        id: 6, title: "Proyecto: API REST tipada", duration: "20:00", completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Estructura del proyecto" },
          { time: "04:00", seconds: 240, label: "Express con TypeScript" },
          { time: "09:00", seconds: 540, label: "Controllers tipados" },
          { time: "13:00", seconds: 780, label: "Mongoose + TypeScript" },
          { time: "17:00", seconds: 1020, label: "Testing y deployment" }
        ]
      },
    ],
  },
]