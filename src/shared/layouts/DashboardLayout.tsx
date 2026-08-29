type DashboardLayoutProps = {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
}

export function DashboardLayout({
  title,
  description,
  action,
  children,
}: DashboardLayoutProps) {
  return (
    <main className="p-6 lg:p-10 space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl uppercase tracking-widest text-muted-foreground text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-gray-600 dark:text-gray-400 text-pretty">
              {description}
            </p>
          )}
        </div>

        {action && <div>{action}</div>}
      </header>

      {children}
    </main>
  )
}
