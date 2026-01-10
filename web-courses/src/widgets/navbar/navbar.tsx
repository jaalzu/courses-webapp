'use client'

// 1. React & Next.js
import Image from "next/image"
import Link from "next/link"


// 2. Features (Lógica de autenticación/estado global)
import { useAuthStore } from '@/features/auth/model/useAuthStore' 

// 3. Widgets (Componentes complejos de la UI)
import { SidebarTrigger } from "@/widgets/sidebar/sidebar"

// 4. Shared UI (Componentes base/atómicos)
import { Button } from "@/shared/ui/button"
import { getAvatarColor, getInitials } from "@/shared/lib/utils/avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/index"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip"

// 5. Icons & Assets
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

  
const { logout, currentUser } = useAuthStore() 

  const handleLogout = async () => {
    await logout()
    // Hard reload para limpiar Zustand y memoria al 100%
    window.location.href = '/login'
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-13 items-center">
          
          {/* LADO IZQUIERDO: Mobile Trigger & Logo */}
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="relative h-8 w-8 transition-transform group-hover:scale-110">
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
          </div>

          {/* LADO DERECHO: Acciones & Usuario */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* TEMA (Light/Dark) */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleTheme}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {isDark ? (
                      <SunIcon className="!w-5.5 !h-5.5 text-yellow-500" />
                    ) : (
                      <MoonIcon className="!w-5.5 !h-5.5 text-gray-600" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDark ? "Modo claro" : "Modo oscuro"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* USER MENU */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0 cursor-pointer 
                             hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-700
                             transition-all duration-200 focus-visible:ring-0"
                >
                  <Avatar className="h-10 w-10">
  <AvatarFallback className={`${getAvatarColor(currentUser?.name || 'User')} text-white text-xs`}>
    {getInitials(currentUser?.name || 'User')}
  </AvatarFallback>
</Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 mt-2">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-semibold leading-none">{currentUser?.name || 'Usuario'}</p>
                  <p className="text-xs text-gray-500 truncate leading-none">{currentUser?.email || ''}</p>
                </div>

                <DropdownMenuSeparator />

                <Link href="/perfil">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10"
                  onClick={handleLogout}
                >
                  <ArrowRightStartOnRectangleIcon className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}