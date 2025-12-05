import { Skeleton } from "@/shared/ui/index"

export default function CourseSkeleton() {
return (
    <main className="w-full p-4 md:p-8 space-y-6 bg-gray-50 dark:bg-neutral-900">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
        {/* Columna izquierda: video + descripción */}
        <div className="flex flex-col gap-4">
          {/* Video */}
          <Skeleton className="h-96 w-full rounded-md" />

          {/* Descripción debajo del video */}
          <Skeleton className="h-20 w-full rounded-md" />
        </div>

        {/* Columna derecha: LessonList + Instructor */}
        <div className="flex flex-col gap-6">
          {/* Lista de lecciones */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}

          {/* Extra debajo del LessonList */}
          <Skeleton className="h-16 w-full rounded-md" />

          {/* InstructorCard */}
          <Skeleton className="h-28 w-full rounded-md" />
        </div>
      </div>
    </main>
  )

}
