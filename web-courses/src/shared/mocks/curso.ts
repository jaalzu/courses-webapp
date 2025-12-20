import type { Course } from "@/entities/course/model/types"



export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: "HTML y CSS: Fundamentos del desarrollo web",
    description:
      "Aprende HTML y CSS desde cero. Domina la estructura semántica, estilos modernos, Flexbox, Grid y diseño responsive. El punto de partida perfecto para cualquier desarrollador web.",
    image: "curso1.jpg",
    duration: "3h 30m",
    video: "https://www.youtube.com/embed/rr2H086z16s",
    level: 'beginner',
    instructor: "Juan Pérez",

    extraInfo:
      "HTML y CSS son la base de todo en la web. Dominarlos bien te da fundamentos sólidos para cualquier tecnología frontend que aprendas después.",
    keyPoints: [
      "Escribir HTML semántico y accesible",
      "Crear layouts modernos con Flexbox y Grid",
      "Diseñar interfaces responsive para todos los dispositivos",
      "Aplicar buenas prácticas de CSS y organización de código",
    ],
    quote:
      "Antes de correr con frameworks, hay que caminar bien con HTML y CSS.",

    lessons: [
      {
        id: 1,
        title: "Introducción al desarrollo web",
        duration: "4:20",
      },
      {
        id: 2,
        title: "HTML Semántico",
        duration: "8:45",
      },
      {
        id: 3,
        title: "CSS: Estilos y selectores",
        duration: "10:15",
      },
      {
        id: 4,
        title: "Flexbox y Grid",
        duration: "12:30",
      },
      {
        id: 5,
        title: "Responsive Design",
        duration: "11:00",
      },
    ],
  },
  {
  id: 2,
  title: "JavaScript Moderno: De cero a profesional",
  description: "Domina JavaScript ES6+ con todos sus fundamentos: variables, funciones, arrays, objetos, DOM, eventos, async/await y más. El curso completo para programar en JavaScript.",
 image: "curso2.jpg",
  duration: "5h 20m",
  video: "https://www.youtube.com/embed/ivdTnPl1ND0",
  level: 'beginner',
  instructor: "María González",
  extraInfo: "JavaScript es el lenguaje principal para interactuar con la web. Dominarlo te permite construir desde pequeñas funciones hasta aplicaciones completas modernas.",
  keyPoints: [
    "Aprender variables, tipos de datos y operadores",
    "Funciones, scope y closures",
    "Manipulación de arrays y objetos con métodos modernos",
    "Interacción con el DOM y manejo de eventos",
    "Asincronía con Promises y Async/Await",
    "Construcción de un proyecto práctico de tareas"
  ],
  quote: "Con JavaScript no solo creas funciones, construyes experiencias interactivas.",
  lessons: [
    { 
      id: 1, title: "Fundamentos de JavaScript", duration: "8:15", 
    
    },
    { 
      id: 2, title: "Funciones y scope", duration: "11:40", 
     
    },
    { 
      id: 3, title: "Arrays y objetos", duration: "13:00", 
   
    },
    { 
      id: 4, title: "DOM y Eventos", duration: "15:20", 
    
    },
    { 
      id: 5, title: "Asincronía: Promises y Async/Await", duration: "14:30", 
     
    },
    { 
      id: 6, title: "Proyecto: App de tareas", duration: "18:00", 
     
    },
  ],
},
{
  id: 3,
  title: "Node.js y Express: Backend desde cero",
  description: "Domina el desarrollo backend con Node.js y Express. Aprende a crear APIs RESTful, autenticación, bases de datos y deploy. Perfecto para convertirte en fullstack developer.",
   image: "curso3.jpg",
  duration: "4h 20m",
  video: "https://www.youtube.com/embed/1hpc70_OoAg",
  level: 'intermediate',
  instructor: "Carlos Rodríguez",
  extraInfo: "Node.js y Express te permiten construir servidores, APIs y aplicaciones backend completas. Este curso te prepara para crear proyectos reales y conectarlos con frontend moderno.",
  keyPoints: [
    "Instalación y fundamentos de Node.js",
    "Creación de servidores y rutas con Express",
    "Diseño de APIs RESTful",
    "Conexión con bases de datos usando MongoDB y Mongoose",
    "Autenticación y seguridad con JWT",
    "Deploy de aplicaciones backend en producción"
  ],
  quote: "Un backend sólido es la columna vertebral de cualquier aplicación moderna.",
  lessons: [
    { 
      id: 1, title: "Introducción a Node.js", duration: "5:15",
    
    },
    { 
      id: 2, title: "Express.js fundamentals", duration: "12:30", 
   
    },
    { 
      id: 3, title: "APIs RESTful", duration: "15:45", 
    
    },
    { 
      id: 4, title: "MongoDB y Mongoose", duration: "18:20", 
     
    },
    { 
      id: 5, title: "Autenticación JWT", duration: "14:30", 
     
    },
    { 
      id: 6, title: "Deploy en producción", duration: "10:00", 
    
    },
  ],
},

{
  id: 4,
  title: "TypeScript: JavaScript con superpoderes",
  description: "Lleva tu JavaScript al siguiente nivel con TypeScript. Aprende tipado estático, interfaces, generics y cómo aplicarlo en proyectos React y Node.js para código más robusto y mantenible.",
   image: "curso4.webp",

  duration: "3h 10m",
  video: "https://www.youtube.com/embed/BwuLxPH8IDs",
  level: 'intermediate',
  instructor: "Ana Martínez",
  extraInfo: "TypeScript añade tipado estático a JavaScript, lo que ayuda a prevenir errores, mejorar la mantenibilidad y hacer tu código más escalable. Aprende a integrarlo con proyectos React y Node.js.",
  keyPoints: [
    "Tipado estático y ventajas sobre JavaScript puro",
    "Interfaces, tipos avanzados y generics",
    "TypeScript con React: props, hooks y context API",
    "Desarrollo backend con TypeScript y Node.js",
    "Proyectos completos tipados y robustos",
    "Mejores prácticas y debugging de código tipado"
  ],
  quote: "El tipado es la brújula que evita que tu código se pierda en un mar de bugs.",
  lessons: [
    { 
      id: 1, title: "¿Por qué TypeScript?", duration: "6:30", 
     
    },
    { 
      id: 2, title: "Tipos básicos", duration: "11:45", 
 
    },
    { 
      id: 3, title: "Interfaces y tipos avanzados", duration: "13:20", 
     
    },
    { 
      id: 4, title: "Generics y utilidades", duration: "15:00", 
    
    },
    { 
      id: 5, title: "TypeScript con React", duration: "16:30", 
    
    },
    { 
      id: 6, title: "Proyecto: API REST tipada", duration: "20:00", 
    
    },
  ],
},

  {
  id: 5,
  title: "Next.js avanzado: rutas, SSR y API Routes",
  description: "Domina Next.js creando aplicaciones dinámicas con Server Side Rendering, rutas protegidas y conexión a APIs modernas. Nivel avanzado para crear apps en producción.",
 image: "curso2.jpg",
  duration: "4h 10m",
  video: "https://www.youtube.com/embed/Tn6-PIqc4UM",
  level: 'advanced',
  instructor: "María González",
  extraInfo: "Aprende a construir aplicaciones completas con Next.js, aprovechando SSR, SSG, API Routes y manejo avanzado de rutas dinámicas. Ideal para desarrollar proyectos en producción con buenas prácticas.",
  keyPoints: [
    "Server Side Rendering (SSR) y Static Site Generation (SSG)",
    "Rutas dinámicas y catch-all routes",
    "API Routes y autenticación",
    "Incremental Static Regeneration (ISR)",
    "Optimización de performance y SEO",
    "Patrones avanzados de desarrollo en Next.js"
  ],
  quote: "Next.js no solo hace más rápido tu desarrollo, también eleva la calidad de tus aplicaciones.",
  lessons: [
    { 
      id: 1, title: "Introducción", duration: "5:15", 
    },
    { 
      id: 2, title: "Páginas y rutas dinámicas", duration: "12:40", 
    },
    { 
      id: 3, title: "SSR y SSG", duration: "15:00", 
    },
    { 
      id: 4, title: "API Routes", duration: "14:20", 
    },
  ],
},
]