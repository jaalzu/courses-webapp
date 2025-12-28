import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui/index"
import { Input } from "@/shared/ui/index"
import { LockIcon, EnvelopeIcon } from "./icons/icons"
import Image from 'next/image'
import { useAuthStore } from "@/features/auth/hooks/useAuthStore"

export function LoginForm() {
  const router = useRouter()
  const { login, loginWithGoogle, isLoading } = useAuthStore()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
      router.push("/dashboard") // Redirigir al dashboard
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
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
        <h1 className="text-2xl font-semibold">Iniciar sesión en</h1>
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

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative w-full">
          <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="email"
            placeholder="javieralzuu@gmail.com"
            className="pl-10 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="relative w-full mt-3">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="password"
            placeholder="Javier.20"
            className="pl-10 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="text-center text-sm mb-3">
        <a href="#" className="text-black underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="text-primary font-semibold underline">
          Regístrate
        </a>
      </div>
    </div>
  )
}

