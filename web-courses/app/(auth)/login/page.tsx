import { LoginForm } from "@/features/auth/components/LoginForm"
import { UserIcon } from "@heroicons/react/24/outline"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda - formulario + footer */}
      <div className="flex-1 md:w-1/2 flex flex-col h-screen p-6">
        {/* Contenedor para centrar el formulario */}
        <div className="flex-1 flex items-center justify-center">
          <LoginForm />
        </div>

        {/* Footer al final */}
        <footer className="text-xs  flex justify-between">
          <a href="mailto:tucorreo@example.com" className="hover:underline">
            javieralzuu@gmail.com
          </a>
          <span>© javalzu</span>
        </footer>
      </div>

      {/* Columna derecha - imagen */}
      <div className="hidden md:flex md:w-1/2 h-screen">
        <img
          src="/login-bronson.webp"
          alt="Ilustración"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
