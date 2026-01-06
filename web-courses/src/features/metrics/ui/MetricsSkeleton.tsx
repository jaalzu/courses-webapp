'use client'

export function MetricsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-6 sm:px-6 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg mb-3" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 h-32 rounded-lg border dark:border-gray-800 p-6">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          ))}
        </div>

        {/* Popular Courses Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg h-64 border dark:border-gray-800 p-6 mb-8">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 overflow-hidden">
          <div className="h-16 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700" />
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-full bg-gray-100 dark:bg-gray-800 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}