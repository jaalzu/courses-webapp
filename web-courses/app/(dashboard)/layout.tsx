'use client'

import { useEffect, useState } from "react"
import { SidebarProvider } from "@/widgets/sidebar/sidebar"
import { AppSidebar } from "@/widgets/sidebar/app-sidebar"
import { Navbar } from "@/widgets/navbar/navbar"

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
      <div className="flex min-h-screen ">
        {/* Sidebar fijo en desktop */}
        <div className="hidden md:flex">
          <AppSidebar />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col w-full min-w-0">
          {/* Navbar */}
          <Navbar onToggleTheme={toggleTheme} isDark={isDark} />

          {/* Main content */}
          <main className="flex-1 relative">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}