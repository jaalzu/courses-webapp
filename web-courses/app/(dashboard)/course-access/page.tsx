'use client'

import { lazy, Suspense } from 'react'

const CourseAccessManager = lazy(() => 
  import('@/features/admin/course-access/ui/CourseAccessManager').then(mod => ({ 
    default: mod.CourseAccessManager 
  }))
)

export default function CourseAccessPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center">
        <p className="text-gray-600">Cargando gestión de accesos...</p>
      </div>
    }>
      <CourseAccessManager />
    </Suspense>
  )
}