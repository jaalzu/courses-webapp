'use client'

import { BellIcon } from '@heroicons/react/24/outline'
import { NotificationBadge } from '@/features/notifications/ui/NotificationBadge'
import { NotificationsList } from '@/features/notifications/ui/NotificationsList'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

export function NotificationsDropdown() {
  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="
                  relative rounded-full p-2
                  hover:bg-yellow-50 dark:hover:bg-yellow-400/10
                  transition-colors
                "
              >
                <BellIcon className="h-6 w-6 text-yellow-500" />
                <NotificationBadge />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <TooltipContent>
            <p>Notificaciones</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent align="end" className="w-96 p-0">
          <NotificationsList />
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}
