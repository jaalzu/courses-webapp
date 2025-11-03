import { Skeleton } from "@/components/ui/skeleton"

export default function CourseSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-md overflow-hidden flex flex-col shadow-sm border border-gray-200 dark:border-gray-600 w-full min-h-[300px]">
      {/* Imagen */}
      <Skeleton className="w-full h-40" />

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1 justify-between min-h-[260px]">
        <div>
          <Skeleton className="w-3/4 h-6 mb-2 mt-2" /> {/* Título */}
          <Skeleton className="w-1/4 h-5 mb-3" /> {/* Badge */}
          <Skeleton className="w-full h-4 mb-2" /> {/* Descripción línea 1 */}
          <Skeleton className="w-full h-4 mb-2" /> {/* Descripción línea 2 */}
        </div>
        <div>
          <Skeleton className="w-full h-10 mb-4" /> {/* Botón */}
          <Skeleton className="w-1/2 h-4" /> {/* Lecciones */}
        </div>
      </div>

      {/* Barra de progreso */}
      <Skeleton className="h-1.5 w-full" />
    </div>
  )
}
