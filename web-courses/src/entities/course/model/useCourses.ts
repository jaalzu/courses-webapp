import { useQuery } from '@tanstack/react-query'
import { coursesApi } from '@/shared/api/courses'
import { useCourseStore } from './useCourseStore'

export function useCourses() {
  const { data: courses, isLoading, error, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.getAll,
  })
  
  const { filterLevel, searchQuery, viewMode } = useCourseStore()
  
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
    viewMode, 
    refetchCourses: refetch, 
  }
}

// Query para un curso individual
export function useCourse(courseId: string) {
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.getAll,
  })
  
  return {
    data: courses?.find(c => c.id === courseId),
    isLoading: !courses,
  }
}