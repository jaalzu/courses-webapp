type DashboardLayoutProps = {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

export function DashboardLayout({
  title,
  action,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="p-6 lg:p-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl uppercase tracking-widest text-muted-foreground">{title}</h1>
        {action}
      </div>

      {children}
    </div>
  )
}
