'use client'

import { Button } from "@/components/ui/button"
import { Moon, Sun, User, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/sidebar/sidebar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export function Navbar({ onToggleTheme, isDark }: { onToggleTheme: () => void, isDark: boolean }) {
  return (
    <nav className="bg-white dark:bg-neutral-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between h-16 items-center">

          {/* Mobile: Botón sidebar */}
          <div className="md:hidden">
            <SidebarTrigger />
          </div>

          {/* Mobile: Logo a la derecha */}
          <div className="md:hidden">
            <span className="font-bold text-lg text-gray-900 dark:text-white">javacourses</span>
          </div>

          {/* Desktop SOLO: Botón tema + Avatar */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            
            {/* Botón modo oscuro/claro */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </Button>

            {/* Avatar con dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatar.jpg" alt="Usuario" />
                    <AvatarFallback className="bg-primary text-white">
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
                
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
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