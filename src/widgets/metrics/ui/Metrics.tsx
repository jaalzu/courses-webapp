"use client";

import { useMemo } from "react";
import { DashboardLayout } from "@/shared/layouts/DashboardLayout";
import { useAdminDemo } from "@/shared/hooks/useAdminDemo";

// Entidades
import { useUsers } from "@/entities/user/model/useUsers";
import { useCourses } from "@/entities/course/model/useCourses";
import { useAllProgress } from "@/entities/progress/model/useProgressQueries";

// UI
import { MetricsSkeleton } from "@/features/metrics/ui/MetricsSkeleton";
import { StatsCard } from "@/features/metrics/ui/StatsCard";
import { UserProgressTable } from "@/features/metrics/ui/UserProgressTable";
import { PopularCourses } from "@/features/metrics/ui/PopularCourses";

// Helpers
import { deriveMetrics } from "@/features/metrics/lib/deriveMetrics";

export function Metrics() {
  const { users, isLoading: usersLoading } = useUsers(true);
  const { data: progress = [], isLoading: progressLoading } = useAllProgress();
  const { allCourses, isLoading: coursesLoading } = useCourses();
  const { isDemoAdmin } = useAdminDemo();

  const metrics = useMemo(() => {
    if (!users || !allCourses || !progress) {
      return {
        totalUsers: 0,
        admins: 0,
        students: 0,
        popularCourses: [],
        usersWithProgress: [],
      };
    }

    return deriveMetrics({
      users,
      courses: allCourses,
      progress,
    });
  }, [users, allCourses, progress]);

  const DEMO_USERS = [
    {
      id: "demo-1",
      name: "Usuario Demo",
      email: "usuario@demo.com",
      role: "student",
      createdAt: new Date(),
      completedCoursesCount: 3,
      totalLessonsCompleted: 12,
    },
  ];

  const DEMO_POPULAR_COURSES = [
    { id: "demo-c1", title: "Introducción a JavaScript", completionCount: 38 },
    { id: "demo-c2", title: "React desde cero", completionCount: 23 },
    { id: "demo-c3", title: "TypeScript Avanzado", completionCount: 13 },
    { id: "demo-c4", title: "Next.js Full Stack", completionCount: 19 },
    { id: "demo-c5", title: "CSS y Tailwind", completionCount: 24 },
  ];

  const usersToShow = isDemoAdmin ? DEMO_USERS : metrics.usersWithProgress;

  const statsToShow = isDemoAdmin
    ? { totalUsers: 74, admins: 2, students: 72 }
    : metrics;

  const isLoading = usersLoading || progressLoading || coursesLoading;

  if (isLoading) return <MetricsSkeleton />;

  return (
    <DashboardLayout title="Métricas del Sistema" action={null}>
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Total Usuarios" value={statsToShow.totalUsers} />
        <StatsCard title="Administradores" value={statsToShow.admins} />
        <StatsCard title="Estudiantes" value={statsToShow.students} />
      </div>

      {/* LISTAS */}
      <div className="space-y-8">
        <PopularCourses
          courses={isDemoAdmin ? DEMO_POPULAR_COURSES : metrics.popularCourses}
        />

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Usuarios y Roles
            </h2>
          </div>

          <UserProgressTable users={usersToShow} />
        </div>
      </div>
    </DashboardLayout>
  );
}
