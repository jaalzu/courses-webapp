// app/debug-client.tsx
'use client'

import { useEffect } from 'react'
import { useCourseStore } from '@/entities/course/model/useCourseStore'

export default function DebugClient() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore
      window.courseStore = useCourseStore
    }
  }, [])

  return null
}
