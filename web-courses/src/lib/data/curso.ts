import type { Course } from '@/types/course'


export const courses: Course[] = [
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
        completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Bienvenida al curso" },
          { time: "01:30", seconds: 90, label: "Cómo funciona la web" },
          { time: "03:00", seconds: 180, label: "Setup del entorno" },
        ],
      },
      {
        id: 2,
        title: "HTML Semántico",
        duration: "8:45",
        completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Estructura básica HTML" },
          { time: "02:00", seconds: 120, label: "Etiquetas semánticas" },
          { time: "04:30", seconds: 270, label: "Formularios y validación" },
          { time: "06:45", seconds: 405, label: "Accesibilidad básica" },
        ],
      },
      {
        id: 3,
        title: "CSS: Estilos y selectores",
        duration: "10:15",
        completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Sintaxis de CSS" },
          { time: "02:30", seconds: 150, label: "Selectores y especificidad" },
          { time: "05:00", seconds: 300, label: "Box model" },
          { time: "07:45", seconds: 465, label: "Colores y tipografía" },
        ],
      },
      {
        id: 4,
        title: "Flexbox y Grid",
        duration: "12:30",
        completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Introducción a Flexbox" },
          { time: "04:00", seconds: 240, label: "Propiedades de Flexbox" },
          { time: "07:30", seconds: 450, label: "CSS Grid básico" },
          { time: "10:00", seconds: 600, label: "Layouts prácticos" },
        ],
      },
      {
        id: 5,
        title: "Responsive Design",
        duration: "11:00",
        completed: false,
        timestamps: [
          { time: "00:00", seconds: 0, label: "Mobile-first approach" },
          { time: "03:00", seconds: 180, label: "Media queries" },
          { time: "06:00", seconds: 360, label: "Unidades responsive" },
          { time: "08:30", seconds: 510, label: "Proyecto landing page" },
        ],
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
      id: 1, title: "Fundamentos de JavaScript", duration: "8:15", completed: false,
      timestamps: [
        { time: "00:00", seconds: 0, label: "¿Qué es JavaScript?" },
        { time: "02:00", seconds: 120, label: "Variables: let, const, var" },
        { time: "04:30", seconds: 270, label: "Tipos de datos" },
        { time: "06:00", seconds: 360, label: "Operadores" }
      ]
    },
    { 
      id: 2, title: "Funciones y scope", duration: "11:40", completed: false,
      timestamps: [
        { time: "00:00", seconds: 0, label: "Declaración de funciones" },
        { time: "03:30", seconds: 210, label: "Arrow functions" },
        { time: "06:00", seconds: 360, label: "Scope y closure" },
        { time: "09:00", seconds: 540, label: "Callbacks" }
      ]
    },
    { 
      id: 3, title: "Arrays y objetos", duration: "13:00", completed: false,
      timestamps: [
        { time: "00:00", seconds: 0, label: "Arrays básicos" },
        { time: "03:00", seconds: 180, label: "Métodos: map, filter, reduce" },
        { time: "07:00", seconds: 420, label: "Objetos literales" },
        { time: "10:00", seconds: 600, label: "Destructuring" }
      ]
    },
    { 
      id: 4, title: "DOM y Eventos", duration: "15:20", completed: false,
      timestamps: [
        { time: "00:00", seconds: 0, label: "¿Qué es el DOM?" },
        { time: "03:30", seconds: 210, label: "Seleccionar elementos" },
        { time: "07:00", seconds: 420, label: "Manipular contenido" },
        { time: "10:30", seconds: 630, label: "Event listeners" },
        { time: "13:00", seconds: 780, label: "Event delegation" }
      ]
    },
    { 
      id: 5, title: "Asincronía: Promises y Async/Await", duration: "14:30", completed: false,
      timestamps: [
        { time: "00:00", seconds: 0, label: "JavaScript asíncrono" },
        { time: "03:00", seconds: 180, label: "Promises" },
        { time: "07:00", seconds: 420, label: "Async/Await" },
        { time: "10:30", seconds: 630, label: "Fetch API" },
        { time: "12:45", seconds: 765, label: "Manejo de errores" }
      ]
    },
    { 
      id: 6, title: "Proyecto: App de tareas", duration: "18:00", completed: false,
      timestamps: [
        { time: "00:00", seconds: 0, label: "Estructura del proyecto" },
        { time: "04:00", seconds: 240, label: "CRUD completo" },
        { time: "10:00", seconds: 600, label: "LocalStorage" },
        { time: "14:00", seconds: 840, label: "Validaciones y UX" }
      ]
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