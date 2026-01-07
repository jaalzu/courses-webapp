import { useCallback } from 'react'
import { useCourseStore } from '@/entities/course/model/useCourseStore'
import { coursesApi } from '@/shared/api/courses'
import type { Course } from './types'

const MAX_TITLE_LENGTH = 60

export function useCourses() {
  const courses = useCourseStore(s => s.courses)
  const isLoading = useCourseStore(s => s.isLoading)
  const error = useCourseStore(s => s.error)
  
  const setCourses = useCourseStore(s => s.setCourses)
  const addCourseToState = useCourseStore(s => s.addCourseToState)
  const updateCourseInState = useCourseStore(s => s.updateCourseInState)
  const removeCourseFromState = useCourseStore(s => s.removeCourseFromState)
  const setLoading = useCourseStore(s => s.setLoading)
  const setError = useCourseStore(s => s.setError)
  
  const fetchCourses = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await coursesApi.getAll()
      setCourses(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [setCourses, setLoading, setError])
  
  const addCourse = useCallback(async (newCourse: Omit<Course, 'id'>) => {
    if (newCourse.title.length > MAX_TITLE_LENGTH) {
      setError(`El título es demasiado largo (máximo ${MAX_TITLE_LENGTH} caracteres)`)
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await coursesApi.create(newCourse)
      addCourseToState(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [addCourseToState, setLoading, setError])
  
  const updateCourse = useCallback(async (courseId: string, updates: Partial<Course>) => {
    setLoading(true)
    setError(null)
    
    try {
      await coursesApi.update(courseId, updates)
      updateCourseInState(courseId, updates)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [updateCourseInState, setLoading, setError])
  
  const deleteCourse = useCallback(async (courseId: string) => {
    setLoading(true)
    setError(null)
    
    try {
      await coursesApi.delete(courseId)
      removeCourseFromState(courseId)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [removeCourseFromState, setLoading, setError])
  
  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    addCourse,
    updateCourse,
    deleteCourse
  }
}