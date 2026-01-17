// @/shared/lib/supabase/imageUpload.ts
import { supabase } from './client'
import { rateLimiter, RATE_LIMITS } from '../utils/rateLimiter'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_DIMENSION = 1920 // px

interface UploadResult {
  success: boolean
  url?: string
  fileName?: string // Para que guardes solo esto en tu DB
  error?: string
}

// 1. Validar archivo
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  if (!file) return { valid: false, error: 'No se seleccionó ningún archivo' }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Formato no permitido. Usá JPG, PNG o WEBP.' }
  }
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
    return { valid: false, error: `La imagen pesa mucho (${sizeMB}MB). Máximo 2MB.` }
  }
  return { valid: true }
}

// 2. Redimensionar imagen (Promesa)
const resizeImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      let width = img.width
      let height = img.height

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
          else reject(new Error('Error al procesar el blob'))
        },
        'image/webp',
        0.85
      )
    }
    img.onerror = () => reject(new Error('Error al cargar imagen'))
    img.src = URL.createObjectURL(file)
  })
}

// 3. Función Principal de Upload
export const uploadCourseImage = async (
  file: File | null, 
  courseId?: string
): Promise<UploadResult> => {
  try {
    // Si no hay archivo (caso editar texto sin cambiar foto), salimos tranquilos
    if (!file) return { success: true }

    // VERIFICAR RATE LIMIT (Persistente en LocalStorage)
    const check = rateLimiter.canProceed('FILE_UPLOAD', RATE_LIMITS.FILE_UPLOAD)
    if (!check.allowed) {
      return { success: false, error: check.message }
    }

    // VALIDAR
    const validation = validateImage(file)
    if (!validation.valid) return { success: false, error: validation.error }

    // REDIMENSIONAR
    let fileToUpload: Blob
    try {
      fileToUpload = await resizeImage(file)
    } catch (e) {
      console.warn('Fallo resize, usando original')
      fileToUpload = file
    }

    // GENERAR NOMBRE ÚNICO
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 7)
    const fileName = courseId 
      ? `course-${courseId}-${timestamp}.webp` 
      : `img-${timestamp}-${randomStr}.webp`

    // SUBIR A SUPABASE STORAGE
    const { data, error } = await supabase.storage
      .from('courses-imgs')
      .upload(fileName, fileToUpload, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase Error:', error)
      return { success: false, error: 'Error al subir la imagen. Intenta de nuevo.' }
    }

    // OBTENER URL PÚBLICA
    const { data: { publicUrl } } = supabase.storage
      .from('courses-imgs')
      .getPublicUrl(data.path)

    return { 
      success: true, 
      url: publicUrl, 
      fileName: fileName // Este es el que tenés que guardar en tu tabla 'courses'
    }

  } catch (err) {
    console.error('Upload Catch:', err)
    return { success: false, error: 'Ocurrió un error inesperado.' }
  }
}

// 4. Eliminar Imagen
export const deleteCourseImage = async (imageUrlOrName: string): Promise<boolean> => {
  try {
    const fileName = imageUrlOrName.includes('/') 
      ? imageUrlOrName.split('/').pop() 
      : imageUrlOrName

    if (!fileName) return false

    const { error } = await supabase.storage
      .from('courses-imgs')
      .remove([fileName])

    return !error
  } catch (e) {
    return false
  }
}