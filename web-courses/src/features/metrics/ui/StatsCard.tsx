// features/metrics/ui/StatsCard.tsx
interface StatsCardProps {
  title: string;
  value: number;
}

export function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">
  {value}
</p>

        </div>
      </div>
    </div>
  );
}