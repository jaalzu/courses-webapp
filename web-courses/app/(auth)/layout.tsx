'use client'
import { CustomImage } from "@/shared/ui/customImage"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda: login o registro */}
      <div className="flex-1 md:w-1/2 flex flex-col h-screen p-6">
        
        {/* Logo arriba del formulario */}
        <div className="flex justify-center ">
          <img
            src="/icons/svg/logo1.svg"
            alt="Logo"
            className="w-12 h-12 opacity-90 hover:opacity-100 transition-opacity duration-200"
          />
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>

        {/* Footer común */}
        <footer className="text-xs flex justify-between mt-4">
          <a href="mailto:javieralzuu@gmail.com" className="hover:underline">
            javieralzuu@gmail.com
          </a>
          <span>© javalzu</span>
        </footer>
      </div>

      {/* Columna derecha: imagen fija */}
      <div className="hidden md:flex md:w-1/2 h-screen">
        <CustomImage
          src="/login-bronson.webp"
          alt="Ilustración"
          className="w-full h-full object-cover"
          width={800}
          height={600}
        />
      </div>
    </div>
  )
}
