import { create } from 'zustand'
import type { Course } from '../types'
import { courseQueries } from '@/shared/lib/supabase/queries/courses'
import { getCourseImage } from '@/shared/lib/supabase/storage' // <-- Importa tu helper

interface CourseStore {
  courses: Course[]
  isLoading: boolean
  error: string | null
  fetchCourses: () => Promise<void>
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>
  updateCourse: (courseId: string, updates: Partial<Course>) => Promise<void>
  deleteCourse: (courseId: string) => Promise<void>
  getCourseById: (courseId: string) => Course | undefined
}

// Función helper interna para no repetir la lógica de mapeo
const mapVisualData = (dbData: any): Course => ({
  ...dbData,
  // 1. Traducimos thumbnail_url -> image
  image: getCourseImage(dbData.thumbnail_url),
  // 2. Traducimos difficulty -> level (Esto arregla que no se vea la dificultad)
  level: dbData.difficulty || 'beginner', 
  // 3. Protegemos las lecciones
  lessons: (dbData.lessons || []).map((l: any) => ({
    ...l,
    videoUrl: l.video_url || ''
  }))
})

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null })
    const { data, error } = await courseQueries.getAll()

    if (error) {
      set({ error: error.message, isLoading: false })
    } else {
      // Mapeamos todo el array de cursos
      const formattedCourses = (data as any[]).map(mapVisualData)
      set({ 
        courses: formattedCourses, 
        isLoading: false 
      })
    }
  },

  addCourse: async (newCourse) => {
    set({ isLoading: true, error: null })
    const { data, error } = await courseQueries.create(newCourse)

    if (error) {
      set({ error: error.message, isLoading: false })
    } else if (data) {
      set((state) => ({ 
        courses: [mapVisualData(data), ...state.courses], 
        isLoading: false 
      }))
    }
  },

updateCourse: async (courseId, updates) => {
 set({ isLoading: true, error: null });

  // 1. Solo enviamos campos que sabemos que existen en la tabla 'courses'
  const dbUpdates: any = {};
  
if (updates.title !== undefined) dbUpdates.title = updates.title;
if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.duration) dbUpdates.duration = Number(updates.duration);
  if (updates.instructor) dbUpdates.instructor = updates.instructor;
  
  // Mapeo de nombres (Front -> DB)
  if (updates.image) {
  // 1. Si es una URL de tu Storage de Supabase, extraemos solo el nombre final
  if (updates.image.includes('supabase.co/storage')) {
    const urlParts = updates.image.split('/');
    // Tomamos el último segmento (ej: "curso1.webp")
    dbUpdates.thumbnail_url = urlParts.pop(); 
  } else {
    // 2. Si es una ruta relativa o una URL externa, la dejamos como está
    dbUpdates.thumbnail_url = updates.image;
  }
}
  if (updates.level) dbUpdates.difficulty = updates.level;

  console.log("Enviando a DB:", dbUpdates);

  const { data, error } = await courseQueries.update(courseId, dbUpdates);

  if (error) {
    console.error("Error de Supabase:", error);
    set({ error: error.message, isLoading: false });
  } else if (data) {
    // 🔥 LOG CLAVE 2: ¿Qué nos respondió la DB?
    console.log("Lo que nos devolvió Supabase:", data);

    const rawData = Array.isArray(data) ? data[0] : data;

    set((state) => ({
      courses: state.courses.map((c) => {
        if (c.id === courseId) {
          const formatted = mapVisualData(rawData);
          return {
            ...c,
            ...formatted,
            // Si la data de la DB no trae lecciones, mantenemos las locales
            lessons: (rawData as any).lessons ? formatted.lessons : c.lessons,
            // Forzamos la descripción si no cambió
            description: rawData.description || c.description
          };
        }
        return c;
      }),
      isLoading: false
    }));
  }
},


  deleteCourse: async (courseId) => {
    set({ isLoading: true, error: null })
    const { error } = await courseQueries.delete(courseId)

    if (error) {
      set({ error: error.message, isLoading: false })
    } else {
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== courseId),
        isLoading: false
      }))
    }
  },

  getCourseById: (courseId) => get().courses.find((c) => c.id === courseId),
}))