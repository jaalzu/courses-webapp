'use client'

import { useState } from 'react'
import { useUsers } from '@/entities/user/model/useUsers'
import { useCourses } from '@/entities/course/model/useCourses'
import { useUserAccess } from '@/entities/user/model/useUserAccess'
import { useGrantAccess, useRevokeAccess } from '../model/useCourseAccess'
import { UserSelector } from './UserSelector'
import { CourseAccessList } from './CourseAccessList'

export function CourseAccessManager() {
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  
  const { users, isLoading: loadingUsers } = useUsers(true)
  const { allCourses: courses, isLoading: loadingCourses } = useCourses()
  const { data: userAccess, isLoading: loadingAccess } = useUserAccess(selectedUserId)
  
  const grantAccess = useGrantAccess()
  const revokeAccess = useRevokeAccess()

  const selectedUser = users?.find(u => u.id === selectedUserId)
  
  const accessedCourseIds = new Set(
    userAccess?.map(access => access.course_id) || []
  )

  const handleToggleAccess = async (courseId: string, hasAccess: boolean) => {
    if (!selectedUserId) return
    
    try {
      if (hasAccess) {
        await revokeAccess.mutateAsync({ userId: selectedUserId, courseId })
      } else {
        await grantAccess.mutateAsync({ userId: selectedUserId, courseId })
      }
    } catch (error) {
      console.error('Error toggling access:', error)
    }
  }

  if (loadingUsers || loadingCourses) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl uppercase tracking-widest text-muted-foreground mb-3">
          Gestión de Acceso a Cursos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Administra qué usuarios pueden ver cada curso
        </p>
      </div>

      <UserSelector
        users={users || []}
        selectedUserId={selectedUserId}
        onSelect={setSelectedUserId}
      />

      {selectedUserId && selectedUser && (
        <CourseAccessList
          user={selectedUser}
          courses={courses || []}
          accessedCourseIds={accessedCourseIds}
          onToggle={handleToggleAccess}
          isPending={grantAccess.isPending || revokeAccess.isPending}
          isLoading={loadingAccess}
        />
      )}
    </div>
  )
}