'use client'
import { CustomImage } from "@/components/ui/customImage"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda: contenido dinámico (login o register) */}
      <div className="flex-1 md:w-1/2 flex flex-col h-screen p-6">
        <div className="flex-1 flex items-center justify-center">{children}</div>

        {/* Footer común */}
        <footer className="text-xs flex justify-between">
          <a href="mailto:javieralzuu@gmail.com" className="hover:underline">
            javieralzuu@gmail.com
          </a>
          <span>© javalzu</span>
        </footer>
      </div>

      {/* Columna derecha: imagen fija */}
      <div className="hidden md:flex md:w-1/2 h-screen ">
    <CustomImage src="/login-bronson.webp" alt="Ilustración" className="w-full h-full " width={800} height={600} />
      </div>
    </div>
  )
}
