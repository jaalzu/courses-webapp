// app/auth/layout.tsx (SACAMOS EL 'use client')
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 md:w-1/2 flex flex-col h-screen p-6">
        
        <div className="flex justify-center">
          <Image
            src="/icons/svg/logo1.svg"
            alt="Logo"
            width={68}   
            height={68}
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>

        <footer className="text-xs flex justify-between mt-4">
          <a href="mailto:javieralzuu@gmail.com" className="hover:underline">
            javieralzuu@gmail.com
          </a>
          <span>© javalzu</span>
        </footer>
      </div>

      <div className="hidden md:flex md:w-1/2 h-screen relative">
        <Image
          src="/login-bronson.webp"
          alt="Ilustración"
          fill
          priority 
          sizes="50vw" 
          quality={100}
          className="object-cover" // Recomendado para que no se deforme al usar 'fill'
        />
      </div>
    </div>
  )
}