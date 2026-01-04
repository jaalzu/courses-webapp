// app/(dashboard)/layout.tsx
'use client'

import { useEffect, useState } from "react"
import dynamic from 'next/dynamic' // ← Agregar
import { SidebarProvider } from "@/widgets/sidebar/sidebar"
import { AppSidebar } from "@/widgets/sidebar/app-sidebar"

const Navbar = dynamic(() => import("@/widgets/navbar/navbar").then(mod => ({ default: mod.Navbar })), {
  ssr: false, 
  loading: () => <div className="h-13" />
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean | null>(null)

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const activeTheme = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDark(activeTheme)
    document.documentElement.classList.toggle("dark", activeTheme)
  }, [])

  if (isDark === null) return null

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <div className="hidden md:flex">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col w-full min-w-0">
          <Navbar onToggleTheme={toggleTheme} isDark={isDark} />

          <main className="flex-1 relative">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}