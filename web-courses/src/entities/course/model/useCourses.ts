import { useQuery } from '@tanstack/react-query'
import { coursesApi } from '@/shared/api/courses'
import { useCourseStore } from './useCourseStore'
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'

export function useCourses() {
  const { data: courses, isLoading, error, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.getAll, // ✅ MANTENER - el RLS ya filtra automáticamente
  })
  
  const { filterLevel, searchQuery, viewMode } = useCourseStore()
  
  const errorMessage = error ? getAuthErrorMessage(error) : null

  const filteredCourses = courses?.filter(course => {
    const matchesLevel = !filterLevel || course.level === filterLevel
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLevel && matchesSearch
  })
  
  return {
    courses: filteredCourses,
    allCourses: courses || [], 
    isLoading,
    error, 
    errorMessage, 
    viewMode, 
    refetchCourses: refetch, 
  }
}

export function useCourse(courseId: string) {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.getAll,
  })
  
  return {
    data: courses?.find(c => c.id === courseId),
    isLoading,
    errorMessage: error ? getAuthErrorMessage(error) : null
  }
}