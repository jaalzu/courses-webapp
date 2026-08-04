import { useQuery } from '@tanstack/react-query'
import { coursesApi } from '@/entities/course/application/coursesApi'
import { filterCourses } from '@/entities/course/domain/courseFilters'
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
    queryFn: coursesApi.listCourses,
  })

  const { filterLevel, searchQuery, viewMode } = useCourseStore()

  const errorMessage = error ? getAuthErrorMessage(error) : null

  const filteredCourses = filterCourses(courses ?? [], {
    level: filterLevel,
    search: searchQuery,
  })

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
    queryFn: () => coursesApi.getCourse(courseId),
    enabled: !!courseId,
  })

  return {
    data: course,
    isLoading,
    error,
    errorMessage: error ? getAuthErrorMessage(error) : null,
  }
}
