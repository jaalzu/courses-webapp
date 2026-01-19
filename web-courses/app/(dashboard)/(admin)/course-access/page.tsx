import { Suspense, lazy } from 'react'

const CourseAccessManager = lazy(() =>
  import('@/features/admin/course-access/ui/CourseAccessManager').then(
    (m) => ({ default: m.CourseAccessManager })
  )
)

export default function Page() {
  return (
    <Suspense fallback={<p className="p-8">Cargando gestión de accesos…</p>}>
      <CourseAccessManager />
    </Suspense>
  )
}
