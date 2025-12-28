"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui/index"
import { Input } from "@/shared/ui/index"
import { UserIcon, LockIcon, EnvelopeIcon } from "./icons/icons"
import Image from 'next/image'
import { useAuthStore } from "@/features/auth/hooks/useAuthStore"



export function RegisterForm() {
  const router = useRouter()
  const { register, loginWithGoogle, isLoading } = useAuthStore()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      await register(email, password, name)
      router.push("/dashboard") // Redirigir al dashboard
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      // El redirect lo maneja Supabase
    } catch (err: any) {
      setError(err.message || "Error con Google")
    }
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Crear cuenta</h1>
        <p className="text-muted-foreground">Gastronomy Mentor</p>
      </div>

      <Button 
        variant="default" 
        size="lg" 
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <Image
          src="/icons/svg/google-icon.svg"
          alt="Google"
          width={20}
          height={20}
        />
        Registrarse con Google
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

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative w-full">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Nombre completo" 
            className="pl-10 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="relative w-full">
          <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            type="email" 
            placeholder="Correo electrónico" 
            className="pl-10 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="relative w-full">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            type="password" 
            placeholder="Contraseña" 
            className="pl-10 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="relative w-full">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            type="password" 
            placeholder="Confirmar contraseña" 
            className="pl-10 w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="w-full font-bold hover:shadow-lg border border-gray-300 shadow-sm transition-shadow"
          disabled={isLoading}
        >
          {isLoading ? "Creando cuenta..." : "Registrarse"}
        </Button>
      </form>

      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-primary font-semibold underline">
          Inicia sesión
        </a>
      </div>
    </div>
  )
}