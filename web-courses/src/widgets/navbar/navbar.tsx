'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/index"
import { SidebarTrigger } from "@/widgets/sidebar/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"

import {
  MoonIcon,
  SunIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline"

export function Navbar({
  onToggleTheme,
  isDark,
}: {
  onToggleTheme: () => void
  isDark: boolean
}) {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-13 items-center">
          {/* Mobile: botón sidebar */}
          <div className="md:hidden">
            <SidebarTrigger />
          </div>

          {/* Logo + texto */}
          <Link
            href="/"
            className="md:flex-1 flex items-center justify-center md:justify-start gap-2"
          >
            <div className="relative h-8 w-8">
              <Image
                src="/icons/svg/logo1.svg"
                alt="javacourses logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
              javacourses
            </span>
          </Link>

          {/* Botón tema + Avatar */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Modo oscuro / claro */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? (
                <SunIcon className="!w-5.5 !h-5.5 text-gray-600 dark:text-gray-100" />
              ) : (
                <MoonIcon className="!w-5.5 !h-5.5 text-gray-600 dark:text-gray-100" />
              )}
            </Button>

            {/* Avatar con menú */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="relative h-10 w-10 rounded-full p-0 cursor-pointer 
                 hover:scale-105 transition-transform duration-200 
                 focus-visible:ring-0 focus-visible:ring-offset-0 
                 focus:outline-none"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src="/avatar.png" alt="Usuario" />
        <AvatarFallback className="bg-primary text-white dark:text-black dark:bg-white">
          JD
        </AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Juan Pérez</p>
                    <p className="text-xs text-gray-500">juan@ejemplo.com</p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <Link href="/perfil">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <ArrowRightStartOnRectangleIcon className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
