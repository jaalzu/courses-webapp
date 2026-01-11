import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { Button} from "@/shared/ui"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip"

interface Props {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
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
  )
}