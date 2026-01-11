import Link from "next/link"
import { UserIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { getAvatarColor, getInitials } from "@/shared/lib/utils/avatar"
import { Avatar, AvatarFallback, Button, } from "@/shared/ui"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"

export function UserMenu() {
  const { logout, currentUser } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  const userName = currentUser?.name || 'Usuario'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 cursor-pointer hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-700 transition-all duration-200 focus-visible:ring-0">
          <Avatar className="h-10 w-10">
            <AvatarFallback className={`${getAvatarColor(userName)} text-white text-xs`}>
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-semibold leading-none">{userName}</p>
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
  )
}