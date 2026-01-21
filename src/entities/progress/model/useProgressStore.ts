'use client'

import { create } from 'zustand'

interface ProgressUIState {
  lastSelectedLessonId: string | null 
  isFilterOpen: boolean
}

interface ProgressUIActions {
  setLastSelectedLesson: (id: string | null) => void
  toggleFilter: () => void
}

export const useProgressStore = create<ProgressUIState & ProgressUIActions>((set) => ({
  lastSelectedLessonId: null,
  isFilterOpen: false,

  setLastSelectedLesson: (id) => set({ lastSelectedLessonId: id }),
  toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
}))