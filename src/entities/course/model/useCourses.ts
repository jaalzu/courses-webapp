import { useQuery } from '@tanstack/react-query'
import { coursesApi } from '@/shared/api/courses'
import { useCourseStore } from './useCourseStore'
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'
import type { Course } from '@/entities/course/types'

export function useCourses() {
  const {
    data: courses,
    isLoading,
    error,
    refetch,
  } = useQuery<Course[], Error>({
    queryKey: ['courses'],
    queryFn: coursesApi.getAll,
  })

  const { filterLevel, searchQuery, viewMode } = useCourseStore()

  const errorMessage = error ? getAuthErrorMessage(error) : null

  const filteredCourses =
    courses?.filter(course => {
      const matchesLevel = !filterLevel || course.level === filterLevel
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesLevel && matchesSearch
    }) ?? []

  return {
    courses: filteredCourses,
    allCourses: courses ?? [],
    isLoading,
    error,
    errorMessage,
    viewMode,
    refetchCourses: refetch,
  }
}

export function useCourse(courseId: string) {
  const { data: course, isLoading, error } = useQuery<Course, Error>({
    queryKey: ['course', courseId],
    queryFn: () => coursesApi.getById(courseId),
    enabled: !!courseId,
  })

  return {
    data: course,
    isLoading,
    error,
    errorMessage: error ? getAuthErrorMessage(error) : null,
  }
}
