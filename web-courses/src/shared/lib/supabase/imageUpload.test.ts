import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  validateImage,
  checkUploadCooldown,
  setUploadCooldown,
  uploadCourseImage,
  deleteCourseImage,
} from './imageUpload'
import { supabase } from './client'

// Mock de Supabase
vi.mock('./client', () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(),
        getPublicUrl: vi.fn(),
        remove: vi.fn(),
      })),
    },
  },
}))

// Mock de Image, Canvas y URL.createObjectURL para resizeImage
global.Image = class {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  src = ''
  width = 800
  height = 600
} as any

global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')

const mockCanvas = {
  width: 0,
  height: 0,
  getContext: vi.fn(() => ({
    drawImage: vi.fn(),
  })),
  toBlob: vi.fn((callback) => {
    // Simular blob exitoso inmediatamente
    const mockBlob = new Blob(['mock-image-data'], { type: 'image/webp' })
    callback(mockBlob)
  }),
}

global.document = {
  createElement: vi.fn((tag) => {
    if (tag === 'canvas') return mockCanvas
    return {}
  }),
} as any

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

// Helper para crear archivos mock
const createMockFile = (
  name: string,
  size: number,
  type: string
): File => {
  const blob = new Blob(['x'.repeat(size)], { type })
  return new File([blob], name, { type })
}

describe('validateImage', () => {
  it('debe rechazar si no hay archivo', () => {
    const result = validateImage(null as any)
    
    expect(result.valid).toBe(false)
    expect(result.error).toBe('No se seleccionó ningún archivo')
  })

  it('debe rechazar tipos de archivo no permitidos', () => {
    const file = createMockFile('test.gif', 1000, 'image/gif')
    
    const result = validateImage(file)
    
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Solo se permiten imágenes JPG, PNG o WEBP')
  })

  it('debe aceptar JPEG', () => {
    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    
    const result = validateImage(file)
    
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('debe aceptar JPG', () => {
    const file = createMockFile('test.jpg', 1000, 'image/jpg')
    
    const result = validateImage(file)
    
    expect(result.valid).toBe(true)
  })

  it('debe aceptar PNG', () => {
    const file = createMockFile('test.png', 1000, 'image/png')
    
    const result = validateImage(file)
    
    expect(result.valid).toBe(true)
  })

  it('debe aceptar WEBP', () => {
    const file = createMockFile('test.webp', 1000, 'image/webp')
    
    const result = validateImage(file)
    
    expect(result.valid).toBe(true)
  })

  it('debe rechazar archivos muy pesados', () => {
    const file = createMockFile('big.jpg', 3 * 1024 * 1024, 'image/jpeg') // 3MB
    
    const result = validateImage(file)
    
    expect(result.valid).toBe(false)
    expect(result.error).toContain('muy pesada')
    expect(result.error).toContain('3.00MB')
    expect(result.error).toContain('Máximo 2MB')
  })

  it('debe aceptar archivo en el límite exacto (2MB)', () => {
    const file = createMockFile('limit.jpg', 2 * 1024 * 1024, 'image/jpeg')
    
    const result = validateImage(file)
    
    expect(result.valid).toBe(true)
  })

  it('debe rechazar archivo justo por encima del límite', () => {
    const file = createMockFile('over.jpg', 2 * 1024 * 1024 + 1, 'image/jpeg')
    
    const result = validateImage(file)
    
    expect(result.valid).toBe(false)
  })

  it('debe mostrar tamaño correcto en el error', () => {
    const file = createMockFile('big.jpg', 2.5 * 1024 * 1024, 'image/jpeg')
    
    const result = validateImage(file)
    
    expect(result.error).toContain('2.50MB')
  })
})

describe('checkUploadCooldown', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debe permitir upload si no hay registro previo', () => {
    const result = checkUploadCooldown()
    
    expect(result.canUpload).toBe(true)
    expect(result.remainingTime).toBeUndefined()
  })

  it('debe bloquear upload si no han pasado 5 minutos', () => {
    const now = Date.now()
    vi.setSystemTime(now)
    
    // Simular upload hace 2 minutos
    localStorage.setItem('last_image_upload', (now - 2 * 60 * 1000).toString())
    
    const result = checkUploadCooldown()
    
    expect(result.canUpload).toBe(false)
    expect(result.remainingTime).toBe(3) // 5 - 2 = 3 minutos
  })

  it('debe permitir upload si pasaron más de 5 minutos', () => {
    const now = Date.now()
    vi.setSystemTime(now)
    
    // Simular upload hace 6 minutos
    localStorage.setItem('last_image_upload', (now - 6 * 60 * 1000).toString())
    
    const result = checkUploadCooldown()
    
    expect(result.canUpload).toBe(true)
  })

  it('debe calcular correctamente el tiempo restante', () => {
    const now = Date.now()
    vi.setSystemTime(now)
    
    // Upload hace 4 minutos y 30 segundos
    localStorage.setItem('last_image_upload', (now - 4.5 * 60 * 1000).toString())
    
    const result = checkUploadCooldown()
    
    expect(result.canUpload).toBe(false)
    expect(result.remainingTime).toBe(1) // Redondea hacia arriba: 0.5 min → 1 min
  })

  it('debe permitir upload exactamente en el límite de 5 minutos', () => {
    const now = Date.now()
    vi.setSystemTime(now)
    
    localStorage.setItem('last_image_upload', (now - 5 * 60 * 1000).toString())
    
    const result = checkUploadCooldown()
    
    expect(result.canUpload).toBe(true)
  })

  it('debe bloquear upload justo antes del límite', () => {
    const now = Date.now()
    vi.setSystemTime(now)
    
    // 5 minutos menos 1 segundo
    localStorage.setItem('last_image_upload', (now - (5 * 60 * 1000 - 1000)).toString())
    
    const result = checkUploadCooldown()
    
    expect(result.canUpload).toBe(false)
    expect(result.remainingTime).toBe(1)
  })
})

describe('setUploadCooldown', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debe guardar el timestamp actual', () => {
    const now = 1234567890000
    vi.setSystemTime(now)
    
    setUploadCooldown()
    
    expect(localStorage.getItem('last_image_upload')).toBe(now.toString())
  })

  it('debe sobrescribir timestamp anterior', () => {
    localStorage.setItem('last_image_upload', '1111111111111')
    
    const now = 9999999999999
    vi.setSystemTime(now)
    
    setUploadCooldown()
    
    expect(localStorage.getItem('last_image_upload')).toBe(now.toString())
  })
})

describe('uploadCourseImage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    vi.useRealTimers()
    
    // Resetear el mock de Image para que onload se ejecute
    global.Image = class {
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      src = ''
      width = 800
      height = 600
      
      constructor() {
        // Simular carga exitosa de imagen inmediatamente
        setTimeout(() => {
          if (this.onload) this.onload()
        }, 0)
      }
    } as any
  })

  it('debe rechazar si está en cooldown', async () => {
    const now = Date.now()
    localStorage.setItem('last_image_upload', (now - 2 * 60 * 1000).toString())
    
    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    const result = await uploadCourseImage(file)
    
    expect(result.success).toBe(false)
    expect(result.error).toContain('esperar')
    expect(result.error).toContain('minuto')
  })

  it('debe rechazar archivo inválido', async () => {
    const file = createMockFile('test.gif', 1000, 'image/gif')
    const result = await uploadCourseImage(file)
    
    expect(result.success).toBe(false)
    expect(result.error).toBe('Solo se permiten imágenes JPG, PNG o WEBP')
  })

  it('debe generar nombre con courseId si se proporciona', async () => {
    const mockUpload = vi.fn().mockResolvedValue({ 
      data: { path: 'course-123-1234567890.webp' }, 
      error: null 
    })
    const mockGetPublicUrl = vi.fn().mockReturnValue({ 
      data: { publicUrl: 'https://example.com/image.webp' } 
    })

    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: mockUpload,
      getPublicUrl: mockGetPublicUrl,
    } as any)

    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    await uploadCourseImage(file, '123')

    expect(mockUpload).toHaveBeenCalled()
    const uploadedFileName = mockUpload.mock.calls[0][0]
    expect(uploadedFileName).toMatch(/^course-123-\d+\.webp$/)
  })

  it('debe generar nombre temp si no hay courseId', async () => {
    const mockUpload = vi.fn().mockResolvedValue({ 
      data: { path: 'temp-1234567890-abc123.webp' }, 
      error: null 
    })
    const mockGetPublicUrl = vi.fn().mockReturnValue({ 
      data: { publicUrl: 'https://example.com/image.webp' } 
    })

    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: mockUpload,
      getPublicUrl: mockGetPublicUrl,
    } as any)

    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    await uploadCourseImage(file)

    expect(mockUpload).toHaveBeenCalled()
    const uploadedFileName = mockUpload.mock.calls[0][0]
    expect(uploadedFileName).toMatch(/^temp-\d+-[a-z0-9]+\.webp$/)
  })

  it('debe retornar URL pública en caso exitoso', async () => {
    const mockUrl = 'https://supabase.co/storage/v1/object/public/courses-imgs/test.webp'
    
    const mockUpload = vi.fn().mockResolvedValue({ 
      data: { path: 'test.webp' }, 
      error: null 
    })
    const mockGetPublicUrl = vi.fn().mockReturnValue({ 
      data: { publicUrl: mockUrl } 
    })

    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: mockUpload,
      getPublicUrl: mockGetPublicUrl,
    } as any)

    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    const result = await uploadCourseImage(file)

    expect(result.success).toBe(true)
    expect(result.url).toBe(mockUrl)
  })

  it('debe manejar error de RLS policy', async () => {
    const mockUpload = vi.fn().mockResolvedValue({ 
      data: null, 
      error: { message: 'violates row-level security policy' } 
    })

    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: mockUpload,
    } as any)

    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    const result = await uploadCourseImage(file)

    expect(result.success).toBe(false)
    expect(result.error).toContain('límite de uploads')
  })

  it('debe manejar errores genéricos de upload', async () => {
    const mockUpload = vi.fn().mockResolvedValue({ 
      data: null, 
      error: { message: 'Network error' } 
    })

    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: mockUpload,
    } as any)

    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    const result = await uploadCourseImage(file)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Error al subir la imagen. Intenta de nuevo.')
  })

  it('debe guardar cooldown después de upload exitoso', async () => {
    const mockUpload = vi.fn().mockResolvedValue({ 
      data: { path: 'test.webp' }, 
      error: null 
    })
    const mockGetPublicUrl = vi.fn().mockReturnValue({ 
      data: { publicUrl: 'https://example.com/test.webp' } 
    })

    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: mockUpload,
      getPublicUrl: mockGetPublicUrl,
    } as any)

    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    await uploadCourseImage(file)

    const cooldown = localStorage.getItem('last_image_upload')
    expect(cooldown).toBeTruthy()
    expect(parseInt(cooldown!)).toBeCloseTo(Date.now(), -2) // Dentro de 100ms
  })
})

describe('deleteCourseImage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe eliminar imagen correctamente', async () => {
    const mockRemove = vi.fn().mockResolvedValue({ error: null })

    vi.mocked(supabase.storage.from).mockReturnValue({
      remove: mockRemove,
    } as any)

    const url = 'https://supabase.co/storage/v1/object/public/courses-imgs/test-image.webp'
    const result = await deleteCourseImage(url)

    expect(result).toBe(true)
    expect(mockRemove).toHaveBeenCalledWith(['test-image.webp'])
  })

  it('debe retornar false si hay error', async () => {
    const mockRemove = vi.fn().mockResolvedValue({ error: { message: 'Not found' } })

    vi.mocked(supabase.storage.from).mockReturnValue({
      remove: mockRemove,
    } as any)

    const url = 'https://example.com/image.webp'
    const result = await deleteCourseImage(url)

    expect(result).toBe(false)
  })

  it('debe retornar false si la URL no tiene nombre de archivo', async () => {
    const url = 'https://example.com/'
    const result = await deleteCourseImage(url)

    expect(result).toBe(false)
  })

  it('debe extraer correctamente el nombre del archivo de la URL', async () => {
    const mockRemove = vi.fn().mockResolvedValue({ error: null })

    vi.mocked(supabase.storage.from).mockReturnValue({
      remove: mockRemove,
    } as any)

    const url = 'https://long.domain.com/path/to/storage/my-file-123.webp'
    await deleteCourseImage(url)

    expect(mockRemove).toHaveBeenCalledWith(['my-file-123.webp'])
  })
})