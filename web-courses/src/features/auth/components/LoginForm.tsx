"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserIcon, LockIcon, EyeIcon, EnvelopeIcon } from "./icons/icons"


export function LoginForm() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Iniciar sesión en</h1>
        <p className="text-muted-foreground">Gastronomy Mentor</p>
      </div>

     <Button variant="default"  size="lg" className="w-full flex items-center justify-center gap-2">
  <img
    src="/google-icon.svg"
    alt="Google"
    className="w-5 h-5"
  />
  Iniciar sesión con Google
</Button>


      {/* Separador */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">o</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
       <div className="relative w-full">
  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
  <Input
    type="email"
    
    placeholder="Correo electrónico"
    className="pl-10 w-full"
  />
</div>

<div className="relative w-full mt-3">
  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
  <Input
    type="password"
    placeholder="Contraseña"
    className="pl-10 w-full"
  />
</div>
      </div>

      <Button
  variant="secondary"
  size="lg"
  className="w-full font-bold border border-gray-300 shadow-sm hover:shadow-lg transition-shadow"
>
  Iniciar sesión
</Button>


      <div className="text-center text-sm mb-3">
        <a href="#" className="text-black hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="text-primary underline">
          Regístrate
        </a>
      </div>
    </div>
  )
}
