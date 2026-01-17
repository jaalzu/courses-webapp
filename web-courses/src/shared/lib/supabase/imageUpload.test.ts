import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  validateImage,
  uploadCourseImage,
  deleteCourseImage,
} from './imageUpload'
import { supabase } from './client'
import { rateLimiter } from '../utils/rateLimiter'

// --- MOCKS DE ENTORNO ---
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

// Mock de Image y Canvas para entorno Node
global.Image = class {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  src = ''
  width = 800
  height = 600
  constructor() {
    setTimeout(() => this.onload?.(), 0)
  }
} as any

global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')

const mockCanvas = {
  width: 0, height: 0,
  getContext: vi.fn(() => ({ drawImage: vi.fn() })),
  toBlob: vi.fn((cb) => cb(new Blob(['mock'], { type: 'image/webp' }))),
}

global.document = {
  createElement: vi.fn((tag) => (tag === 'canvas' ? mockCanvas : {})),
} as any

// --- HELPERS ---
const createMockFile = (name: string, size: number, type: string): File => {
  const blob = new Blob(['x'.repeat(size)], { type })
  return new File([blob], name, { type })
}

// --- TESTS ---
describe('validateImage', () => {
  it('debe rechazar si no hay archivo', () => {
    const result = validateImage(null as any)
    expect(result.valid).toBe(false)
    expect(result.error).toBe('No se seleccionó ningún archivo')
  })

  it('debe aceptar formatos válidos (JPG, PNG, WEBP)', () => {
    expect(validateImage(createMockFile('t.jpg', 100, 'image/jpeg')).valid).toBe(true)
    expect(validateImage(createMockFile('t.png', 100, 'image/png')).valid).toBe(true)
    expect(validateImage(createMockFile('t.webp', 100, 'image/webp')).valid).toBe(true)
  })

  it('debe rechazar archivos de más de 2MB', () => {
    const file = createMockFile('big.jpg', 3 * 1024 * 1024, 'image/jpeg')
    const result = validateImage(file)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('3.00MB')
  })
})

describe('uploadCourseImage', () => {
  beforeEach(() => {
    rateLimiter.clearAll()
    vi.clearAllMocks()
  })

  it('debe bloquear por Rate Limit (simulado)', async () => {
    const file = createMockFile('test.jpg', 1000, 'image/jpeg')
    
    // Agotamos el límite de 20
    for (let i = 0; i < 20; i++) {
      await uploadCourseImage(file)
    }

    const result = await uploadCourseImage(file)
    expect(result.success).toBe(false)
    expect(result.error).toContain('Espera') 
  })

  it('debe generar nombre con courseId correctamente', async () => {
    const mockUpload = vi.fn().mockResolvedValue({ data: { path: 'path' }, error: null })
    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: mockUpload,
      getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'url' } }),
    } as any)

    await uploadCourseImage(createMockFile('t.jpg', 100, 'image/jpeg'), '123')
    const fileName = mockUpload.mock.calls[0][0]
    expect(fileName).toMatch(/^course-123-\d+\.webp$/)
  })

  it('debe generar nombre img- si no hay courseId', async () => {
    const mockUpload = vi.fn().mockResolvedValue({ data: { path: 'path' }, error: null })
    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: mockUpload,
      getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'url' } }),
    } as any)

    await uploadCourseImage(createMockFile('t.jpg', 100, 'image/jpeg'))
    const fileName = mockUpload.mock.calls[0][0]
    expect(fileName).toMatch(/^img-\d+-[a-z0-9]+\.webp$/)
  })

  it('debe registrar el éxito en el localStorage del RateLimiter', async () => {
    vi.mocked(supabase.storage.from).mockReturnValue({
      upload: vi.fn().mockResolvedValue({ data: { path: 'p' }, error: null }),
      getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'u' } }),
    } as any)

    await uploadCourseImage(createMockFile('t.jpg', 100, 'image/jpeg'))
    const stored = localStorage.getItem('rl_FILE_UPLOAD')
    expect(stored).toBeTruthy()
    expect(JSON.parse(stored!).length).toBe(1)
  })
})

describe('deleteCourseImage', () => {
  it('debe extraer el nombre del archivo de la URL y llamar a remove', async () => {
    const mockRemove = vi.fn().mockResolvedValue({ error: null })
    vi.mocked(supabase.storage.from).mockReturnValue({ remove: mockRemove } as any)

    const url = 'https://supabase.co/storage/v1/object/public/imgs/mi-foto.webp'
    const result = await deleteCourseImage(url)

    expect(result).toBe(true)
    expect(mockRemove).toHaveBeenCalledWith(['mi-foto.webp'])
  })
})