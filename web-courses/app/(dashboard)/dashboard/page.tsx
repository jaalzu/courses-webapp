'use client'

import { CoursesDashboard } from "@/widgets/dashboard/CoursesDashboard"
export const dynamic = 'force-dynamic' // ← Agregá esta línea al principio

export default function DashboardPage() {
  return <CoursesDashboard />
}
