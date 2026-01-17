// src/widgets/community/ui/CommunitySkeleton.tsx
export const CommunitySkeleton = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 border-b p-6 md:p-12 flex flex-col items-center animate-pulse">
      {/* Título */}
      <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
      
      {/* Texto */}
      <div className="h-4 w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded mb-2" />
      <div className="h-4 w-3/4 max-w-sm bg-gray-100 dark:bg-gray-800 rounded mb-8" />

      {/* Botón Grande */}
      <div className="h-20 w-full md:w-64 bg-gray-200 dark:bg-gray-700 rounded-md mb-6" />

      {/* Footer text */}
      <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
    </div>
  )
}