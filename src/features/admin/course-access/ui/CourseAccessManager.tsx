"use client";

import { useState } from "react";
import { useUsers } from "@/entities/user/model/useUsers";
import { useCourses } from "@/entities/course/model/useCourses";
import { useUserAccess } from "@/entities/user/model/useUserAccess";
import { useGrantAccess, useRevokeAccess } from "../model/useCourseAccess";
import { UserSelector } from "./UserSelector";
import { CourseAccessList } from "./CourseAccessList";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { useAdminDemo } from "@/shared/hooks/useAdminDemo";
import type { CourseLevel } from "@/entities/course/types";
import type { UserRole } from "@/entities/user/model/types";

const DEMO_USERS = [
  {
    id: "demo-1",
    name: "Ana García",
    email: "ana@demo.com",
    role: "student" as UserRole,
    createdAt: new Date(),
  },
  {
    id: "demo-2",
    name: "Carlos López",
    email: "carlos@demo.com",
    role: "student" as UserRole,
    createdAt: new Date(),
  },
  {
    id: "demo-3",
    name: "María Pérez",
    email: "maria@demo.com",
    role: "admin" as UserRole,
    createdAt: new Date(),
  },
];

const DEMO_COURSES = [
  {
    id: "demo-c1",
    title: "Introducción a JavaScript",
    description: "Fundamentos del lenguaje más usado de la web.",
    image: "",
    duration: "4h 30m",
    instructor: "Demo Instructor",
    level: "beginner" as CourseLevel,
    video: "",
    keyPoints: [],
    lessons: [],
    is_initial: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-c2",
    title: "React desde cero",
    description: "Aprende a construir interfaces modernas con React.",
    image: "",
    duration: "6h",
    instructor: "Demo Instructor",
    level: "intermediate" as CourseLevel,
    video: "",
    keyPoints: [],
    lessons: [],
    is_initial: false,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-c3",
    title: "TypeScript Avanzado",
    description: "Tipos, generics y patrones avanzados.",
    image: "",
    duration: "5h",
    instructor: "Demo Instructor",
    level: "advanced" as CourseLevel,
    video: "",
    keyPoints: [],
    lessons: [],
    is_initial: false,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEMO_COURSES_ACCESS = new Set<string>();

export function CourseAccessManager() {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { isDemoAdmin, runIfAllowed } = useAdminDemo();

  const { users: realUsers, isLoading: loadingUsers } = useUsers(!isDemoAdmin);
  const { allCourses: realCourses, isLoading: loadingCourses } = useCourses();
  const { data: userAccess, isLoading: loadingAccess } =
    useUserAccess(selectedUserId);

  const grantAccess = useGrantAccess();
  const revokeAccess = useRevokeAccess();

  const usersToShow = isDemoAdmin ? DEMO_USERS : realUsers || [];
  const coursesToShow = isDemoAdmin ? DEMO_COURSES : realCourses || [];
  const accessedCourseIds = isDemoAdmin
    ? DEMO_COURSES_ACCESS
    : new Set(userAccess?.map((access) => access.course_id) || []);

  const selectedUser = usersToShow.find((u) => u.id === selectedUserId);

  const handleToggleAccess = async (courseId: string, hasAccess: boolean) => {
    if (!selectedUserId) return;

    runIfAllowed(async () => {
      if (hasAccess) {
        await revokeAccess.mutateAsync({ userId: selectedUserId, courseId });
      } else {
        await grantAccess.mutateAsync({ userId: selectedUserId, courseId });
      }
    });
  };

  if (!isDemoAdmin && (loadingUsers || loadingCourses)) {
    return (
      <div className="p-10 text-center text-gray-600 dark:text-gray-400">
        Cargando...
      </div>
    );
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
        {isDemoAdmin && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
            <p className="text-amber-800 text-sm font-medium">
              <strong>Modo Demostración:</strong> Puedes explorar la gestión de
              accesos, pero los cambios no se persistirán en la base de datos.
            </p>
          </div>
        )}

        <UserSelector
          users={usersToShow}
          selectedUserId={selectedUserId}
          onSelect={setSelectedUserId}
        />

        {selectedUserId && selectedUser && (
          <CourseAccessList
            user={selectedUser}
            courses={coursesToShow}
            accessedCourseIds={accessedCourseIds}
            onToggle={handleToggleAccess}
            isPending={grantAccess.isPending || revokeAccess.isPending}
            isLoading={loadingAccess}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
