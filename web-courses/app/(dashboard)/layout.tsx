'use client'

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/sidebar/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Navbar } from "@/components/ui/navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // Acá podés agregar lógica para persistir el tema
    document.documentElement.classList.toggle('dark')
  }

  return (
    <html lang="en" className={isDark ? 'dark' : ''}>
      <body className="bg-gray-50 dark:bg-gray-900">
        <SidebarProvider>
          <div className="flex min-h-screen">
            
            {/* Sidebar fijo en desktop */}
            <div className="hidden md:flex">
              <AppSidebar />
            </div>

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col w-full">
              
              {/* Navbar */}
              <Navbar onToggleTheme={toggleTheme} isDark={isDark} />

              {/* Main content */}
              <main className="flex-1 p-6 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}