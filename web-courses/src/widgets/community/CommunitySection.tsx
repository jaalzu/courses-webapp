'use client'

import { Button } from "@/shared/ui/button"

const DiscordIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.864-.6083 1.2495-1.8447-.2758-3.68-.2758-5.4868 0-.1636-.3906-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
  </svg>
)

export function CommunitySection() {
  return (
    <main className="p-6 lg:p-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Comunidad</h1>
      
      <div className="bg-white dark:bg-gray-900 rounded-md border p-8 md:p-12 flex flex-col items-center text-center shadow-sm">
        <h2 className="text-xl md:text-3xl font-bold mb-4">
          Unite a nuestro servidor de Discord
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
          Conectá con otros estudiantes, participá de mentorías en vivo y compartí tus proyectos.
        </p>

        <Button 
          className="w-full md:w-auto px-12 py-8 text-2xl font-black bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-md flex gap-4 transition-transform active:scale-95"
          onClick={() => window.open('#', '_blank')}
        >
          <DiscordIcon />
          DISCORD
        </Button>

        <p className="mt-6 text-xs text-gray-500">
          Ya somos más de 500 alumnos activos.
        </p>
      </div>
    </main>
  )
}