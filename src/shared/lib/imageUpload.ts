import { rateLimiter, RATE_LIMITS } from '@/shared/lib/utils/rateLimiter'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_DIMENSION = 1920

interface UploadResult {
  success: boolean
  url?: string
  fileName?: string
  error?: string
}

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

export const uploadCourseImage = async (
  file: File | null,
  courseId?: string
): Promise<UploadResult> => {
  try {
    if (!file) return { success: true }

    const check = rateLimiter.canProceed('FILE_UPLOAD', RATE_LIMITS.FILE_UPLOAD)
    if (!check.allowed) {
      return { success: false, error: check.message }
    }

    const validation = validateImage(file)
    if (!validation.valid) return { success: false, error: validation.error }

    let fileToUpload: Blob
    try {
      fileToUpload = await resizeImage(file)
    } catch {
      fileToUpload = file
    }

    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 7)
    const fileName = courseId
      ? `course-${courseId}-${timestamp}.webp`
      : `img-${timestamp}-${randomStr}.webp`

    const url = URL.createObjectURL(fileToUpload)

    return { success: true, url, fileName }
  } catch {
    return { success: false, error: 'Ocurrió un error inesperado.' }
  }
}

export const deleteCourseImage = async (_imageUrlOrName: string): Promise<boolean> => {
  return true
}
