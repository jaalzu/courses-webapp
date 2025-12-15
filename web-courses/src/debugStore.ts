// src/lib/debugStore.ts
'use client'

import { useCourseStore } from '@/entities/course/model/useCourseStore'

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.courseStore = useCourseStore
}
