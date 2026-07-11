import { createSeedData, type MockStoreData } from './seed'

const STORAGE_KEY = 'mock-store-data'

let memoryStore: MockStoreData | null = null

function loadFromStorage(): MockStoreData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as MockStoreData
  } catch {
    return null
  }
}

function saveToStorage(data: MockStoreData) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore quota errors
  }
}

export function getMockStore(): MockStoreData {
  if (typeof window === 'undefined') {
    if (!memoryStore) memoryStore = createSeedData()
    return memoryStore
  }

  if (!memoryStore) {
    memoryStore = loadFromStorage() ?? createSeedData()
  }
  return memoryStore
}

export function persistMockStore() {
  if (memoryStore) saveToStorage(memoryStore)
}

export function resetMockStore() {
  memoryStore = createSeedData()
  persistMockStore()
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function mutateMockStore(mutator: (store: MockStoreData) => void) {
  const store = getMockStore()
  mutator(store)
  persistMockStore()
}

export function delay(ms = 50): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
