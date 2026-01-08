// app/metrics/page.tsx
import { Metrics } from '@/features/metrics'
import { AdminGuard } from '@/features/admin/AdminGuard' // Importás el que creamos

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <AdminGuard>
      <Metrics />
    </AdminGuard>
  )
}