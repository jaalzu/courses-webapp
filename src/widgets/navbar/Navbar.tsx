'use client'

import Image from "next/image"
import Link from "next/link"

import { SidebarTrigger } from "@/widgets/sidebar/sidebar"
import { UserMenu } from "./UserMenu"
import { ThemeToggle } from "./ThemeToggle"
import { NotificationsDropdown } from "@/widgets/navbar/NotificationsDropdown"
import { useNotifications } from "@/features/notifications/model/useNotifications" // ← Importar

type NavbarProps = {
  onToggleTheme: () => void
  isDark: boolean
}

export function Navbar({ onToggleTheme, isDark }: NavbarProps) {
  useNotifications() // ← Ejecutar acá para que siempre esté activo

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-13 items-center justify-between">

          {/* LADO IZQUIERDO */}
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 transition-transform group-hover:scale-110">
                <Image
                  src="/icons/svg/logo1.svg"
                  alt="logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                javacourses
              </span>
            </Link>
          </div>

          {/* LADO DERECHO */}
          <div className="flex items-center gap-2 md:gap-3">
            <NotificationsDropdown />
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <UserMenu />
          </div>

        </div>
      </div>
    </nav>
  )
}