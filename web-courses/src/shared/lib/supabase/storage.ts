// @/shared/lib/supabase/storage.ts
const PROJECT_ID = 'gpafbzopphyreczrvfdj'

export const getCourseImage = (path: string | null) => {
  if (!path) return '/curso1.webp'
  if (path.startsWith('http')) return path
  
  // Fíjate bien en el nombre: 'courses-imgs' (con la 's' al final)
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/courses-imgs/${path}`
}