'use client'

import Link from "next/link";
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
<nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
       <div className="flex justify-between h-13 items-center">

  {/* Mobile: Botón sidebar */}
  <div className="md:hidden">
    <SidebarTrigger />
  </div>

 {/* Logo - centrado en mobile, a la izquierda en desktop */}
{/* Logo + texto - centrado en mobile, a la izquierda en desktop */}
{/* Logo + texto - centrado en mobile, a la izquierda en desktop */}
<Link href="/" className="md:flex-1 flex items-center justify-center md:justify-start gap-2">
  <img 
    src="/icons/svg/logo1.svg" 
    alt="javacourses logo" 
    className="h-8 w-auto"
  />
  <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
    javacourses
  </span>
</Link>




  {/* Botón tema + Avatar - visible en TODOS los tamaños */}
  <div className="flex items-center gap-2 md:gap-3">
    
    {/* Botón modo oscuro/claro */}
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={onToggleTheme}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 "
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gray-600  dark:text-gray-100" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-100" />
      )}
    </Button>

    {/* Avatar con dropdown */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
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
    <User className="mr-2 h-4 w-4" />
    Perfil
  </DropdownMenuItem>
</Link>
        
       
        
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