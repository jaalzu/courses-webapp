'use client'

import { useState } from 'react'
import { useUsers } from '@/entities/user/model/useUsers'
import { useCourses } from '@/entities/course/model/useCourses'
import { useUserAccess } from '@/entities/user/model/useUserAccess'
import { useGrantAccess, useRevokeAccess } from '../model/useCourseAccess'
import { UserSelector } from './UserSelector'
import { CourseAccessList } from './CourseAccessList'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'

export function CourseAccessManager() {
  const [selectedUserId, setSelectedUserId] = useState<string>('')

  const { users, isLoading: loadingUsers } = useUsers(true)
  const { allCourses: courses, isLoading: loadingCourses } = useCourses()
  const { data: userAccess, isLoading: loadingAccess } =
    useUserAccess(selectedUserId)

  const grantAccess = useGrantAccess()
  const revokeAccess = useRevokeAccess()

  const selectedUser = users?.find(u => u.id === selectedUserId)

  const accessedCourseIds = new Set(
    userAccess?.map(access => access.course_id) || []
  )

  const handleToggleAccess = async (courseId: string, hasAccess: boolean) => {
    if (!selectedUserId) return

    if (hasAccess) {
      await revokeAccess.mutateAsync({ userId: selectedUserId, courseId })
    } else {
      await grantAccess.mutateAsync({ userId: selectedUserId, courseId })
    }
  }

  if (loadingUsers || loadingCourses) {
    return (
      <div className="p-10 text-center text-gray-600">
        Cargando...
      </div>
    )
  }

  return (
    <DashboardLayout
      title="Gestión de Acceso a Cursos"
      action={
        <p className="text-sm text-muted-foreground">
          Administra qué usuarios pueden ver cada curso
        </p>
      }
    >
      <div className="space-y-6">
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
    </DashboardLayout>
  )
}
