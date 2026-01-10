// @/shared/lib/supabase/imageUpload.ts
import { supabase } from './client'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_DIMENSION = 1920 // px
const UPLOAD_COOLDOWN = 5 * 60 * 1000 // 5 minutos en ms
const COOLDOWN_KEY = 'last_image_upload'

interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

// Verificar cooldown de upload
export const checkUploadCooldown = (): { canUpload: boolean; remainingTime?: number } => {
  const lastUpload = localStorage.getItem(COOLDOWN_KEY)
  
  if (!lastUpload) {
    return { canUpload: true }
  }

  const timePassed = Date.now() - parseInt(lastUpload)
  
  if (timePassed < UPLOAD_COOLDOWN) {
    const remainingMs = UPLOAD_COOLDOWN - timePassed
    const remainingMin = Math.ceil(remainingMs / 60000)
    return { canUpload: false, remainingTime: remainingMin }
  }

  return { canUpload: true }
}

// Guardar timestamp del último upload
export const setUploadCooldown = () => {
  localStorage.setItem(COOLDOWN_KEY, Date.now().toString())
}

// Validar archivo antes de subir
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  // 1. Verificar que sea un archivo
  if (!file) {
    return { valid: false, error: 'No se seleccionó ningún archivo' }
  }

  // 2. Verificar tipo de archivo
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Solo se permiten imágenes JPG, PNG o WEBP' }
  }

  // 3. Verificar tamaño
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
    return { valid: false, error: `La imagen es muy pesada (${sizeMB}MB). Máximo 2MB` }
  }

  return { valid: true }
}

// Redimensionar imagen si es muy grande
const resizeImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      let width = img.width
      let height = img.height

      // Solo redimensionar si excede el máximo
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = (height / width) * MAX_DIMENSION
          width = MAX_DIMENSION
        } else {
          width = (width / height) * MAX_DIMENSION
          height = MAX_DIMENSION
        }
      }

      canvas.width = width
      canvas.height = height
      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Error al procesar la imagen'))
        },
        'image/webp',
        0.85 // Calidad 85%
      )
    }

    img.onerror = () => reject(new Error('Error al cargar la imagen'))
    img.src = URL.createObjectURL(file)
  })
}

// Subir imagen a Supabase Storage
export const uploadCourseImage = async (
  file: File,
  courseId?: string
): Promise<UploadResult> => {
  try {
    // 1. Verificar cooldown
    const cooldown = checkUploadCooldown()
    if (!cooldown.canUpload) {
      return { 
        success: false, 
        error: `Debes esperar ${cooldown.remainingTime} minuto(s) antes de subir otra imagen` 
      }
    }

    // 2. Validar archivo
    const validation = validateImage(file)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // 3. Redimensionar si es necesario
    let fileToUpload: Blob = file
    try {
      fileToUpload = await resizeImage(file)
    } catch (resizeError) {
      console.warn('No se pudo redimensionar, usando original:', resizeError)
      fileToUpload = file
    }

    // 4. Generar nombre único
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const fileExt = 'webp' // Siempre convertimos a webp
    const fileName = courseId 
      ? `course-${courseId}-${timestamp}.${fileExt}`
      : `temp-${timestamp}-${randomStr}.${fileExt}`

    // 5. Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from('courses-imgs')
      .upload(fileName, fileToUpload, {
        cacheControl: '3600',
        upsert: false, // No sobrescribir
      })

    if (error) {
      console.error('Error en upload:', error)
      
      // Detectar si es rate limit de la DB
      if (error.message?.includes('violates row-level security policy')) {
        return { success: false, error: 'Has alcanzado el límite de uploads. Espera unos minutos.' }
      }
      
      return { success: false, error: 'Error al subir la imagen. Intenta de nuevo.' }
    }

    // 6. Obtener URL pública
    const { data: urlData } = supabase.storage
      .from('courses-imgs')
      .getPublicUrl(data.path)

    // 7. Guardar timestamp del upload exitoso
    setUploadCooldown()

    return { success: true, url: urlData.publicUrl }
  } catch (error: any) {
    console.error('Error en uploadCourseImage:', error)
    return { success: false, error: 'Error inesperado al subir la imagen' }
  }
}

// Eliminar imagen (útil si el usuario cancela)
export const deleteCourseImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extraer el nombre del archivo de la URL
    const fileName = imageUrl.split('/').pop()
    if (!fileName) return false

    const { error } = await supabase.storage
      .from('courses-imgs')
      .remove([fileName])

    return !error
  } catch (error) {
    console.error('Error eliminando imagen:', error)
    return false
  }
}