import { create } from 'zustand'
import type { CourseLevel } from '../types'

interface CourseStore {
  selectedCourseId: string | null
  filterLevel: CourseLevel | null
  searchQuery: string
  viewMode: 'grid' | 'list'
  
  setSelectedCourse: (id: string | null) => void
  setFilterLevel: (level: CourseLevel | null) => void
  setSearchQuery: (query: string) => void
  setViewMode: (mode: 'grid' | 'list') => void
  clearFilters: () => void
}

export const useCourseStore = create<CourseStore>((set) => ({
  selectedCourseId: null,
  filterLevel: null,
  searchQuery: '',
  viewMode: 'grid',
  
  setSelectedCourse: (id) => set({ selectedCourseId: id }),
  setFilterLevel: (level) => set({ filterLevel: level }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  clearFilters: () => set({ filterLevel: null, searchQuery: '' }),
}))
