import { delay, generateId, getMockStore, mutateMockStore } from '../store'
import type { MockProfile } from '../seed'

const validateName = (name: string): { valid: boolean; error?: string } => {
  const trimmed = name.trim()

  if (trimmed.length < 3) {
    return { valid: false, error: 'El nombre debe tener al menos 3 caracteres' }
  }
  if (trimmed.length > 50) {
    return { valid: false, error: 'El nombre no puede tener más de 50 caracteres' }
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(trimmed)) {
    return { valid: false, error: 'El nombre solo puede contener letras' }
  }

  return { valid: true }
}

export const profileQueries = {
  getById: async (userId: string) => {
    await delay()
    const store = getMockStore()
    const profile = store.profiles.find((p) => p.id === userId)
    if (!profile) return { data: null, error: { message: 'Profile not found' } }
    const { password: _, ...safe } = profile
    return { data: safe, error: null }
  },

  create: async (profile: { id: string; email: string; name?: string }) => {
    await delay()
    if (profile.name) {
      const validation = validateName(profile.name)
      if (!validation.valid) {
        return { data: null, error: { message: validation.error } }
      }
    }

    const newProfile: MockProfile = {
      id: profile.id,
      email: profile.email,
      password: '',
      name: profile.name?.trim() || profile.email.split('@')[0],
      avatar_url: null,
      role: 'student',
      bio: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mutateMockStore((s) => s.profiles.push(newProfile))
    const { password: _, ...safe } = newProfile
    return { data: safe, error: null }
  },

  update: async (userId: string, updates: { name?: string; avatar_url?: string; role?: string; bio?: string }) => {
    await delay()
    if (updates.name !== undefined) {
      const validation = validateName(updates.name)
      if (!validation.valid) {
        return { data: null, error: { message: validation.error } }
      }
      updates.name = updates.name.trim()
    }

    const store = getMockStore()
    const idx = store.profiles.findIndex((p) => p.id === userId)
    if (idx === -1) return { data: null, error: { message: 'Profile not found' } }

    mutateMockStore((s) => {
      Object.assign(s.profiles[idx], updates, { updated_at: new Date().toISOString() })
    })

    const updated = getMockStore().profiles[idx]
    const { password: _, ...safe } = updated
    return { data: safe, error: null }
  },

  search: async (_query: string) => {
    await delay()
    const store = getMockStore()
    const data = store.profiles.map(({ password: _, ...safe }) => safe)
    return { data, error: null }
  },

  delete: async (userId: string) => {
    await delay()
    mutateMockStore((s) => {
      s.profiles = s.profiles.filter((p) => p.id !== userId)
    })
    return { error: null }
  },
}

export { validateName }
