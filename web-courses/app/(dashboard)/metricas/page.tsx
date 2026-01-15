// app/metrics/page.tsx
import { Metrics } from '@/widgets/metrics/ui/Metrics'
import { AdminGuard } from '@/features/admin/AdminGuard'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <AdminGuard>
      <Metrics />
    </AdminGuard>
  )
}