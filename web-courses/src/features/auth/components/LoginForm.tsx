"use client"

// 1. React & Next.js
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from 'next/image'

// 2. Features & Models
import { useAuthStore } from "@/features/auth/model/useAuthStore"

// 3. Shared (UI & Libs)
import { Button, Input } from "@/shared/ui" 
import { LockIcon, EnvelopeIcon } from "./icons/icons"
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'

export function LoginForm() {
  const router = useRouter()
  const { login, loginWithGoogle, isLoading } = useAuthStore()
  
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({ form: "", email: "" })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: "Introduce un email válido" }))
      return false
    }
    setErrors(prev => ({ ...prev, email: "" }))
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ form: "", email: "" })

    if (!validateEmail(formData.email)) return

    try {
      await login(formData.email, formData.password)
      router.push("/dashboard")
    } catch (err: any) {
      setErrors(prev => ({ ...prev, form: getAuthErrorMessage(err) }))
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
    } catch (err: any) {
      setErrors(prev => ({ ...prev, form: getAuthErrorMessage(err) }))
    }
  }

  return (
    <div className="w-full max-w-sm space-y-6 animate-in fade-in duration-500">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión</h1>
        <p className="text-sm text-muted-foreground italic">JavaCourses</p>
      </header>

      {/* Social Login */}
      <Button 
        variant="outline" 
        size="lg" 
        className="w-full flex items-center justify-center gap-3 transition-all hover:bg-gray-50"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <Image src="/icons/svg/google-icon.svg" alt="Google" width={18} height={18} />
        <span className="text-sm font-medium">Continuar con Google</span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-background px-4 text-muted-foreground">o con email</span>
        </div>
      </div>

      {/* Error General */}
      {errors.form && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2.5 rounded-xl text-xs font-medium animate-shake">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <div className="relative">
            <EnvelopeIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.email ? 'text-red-500' : 'text-gray-400'}`} />
            <Input
              type="email"
              placeholder="chef@gastronomy.com"
              className={`pl-10 h-11 rounded-xl transition-all ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                if (errors.email) validateEmail(e.target.value)
              }}
              onBlur={() => validateEmail(formData.email)}
              required
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-[11px] text-red-500 ml-1 font-medium">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="relative">
          <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="password"
            placeholder="Contraseña"
            className="pl-10 h-11 rounded-xl"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={6}
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full h-11 font-bold rounded-xl bg-black hover:bg-gray-800 transition-all active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? "Validando credenciales..." : "Iniciar Sesion"}
        </Button>
      </form>

      <footer className="space-y-4 pt-2">
        <div className="text-center">
          <a href="#" className="text-xs text-muted-foreground hover:text-black transition-colors underline-offset-4 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          ¿Nuevo en la academia?{" "}
          <a href="/register" className="text-black font-bold hover:underline underline-offset-4">
            Crea una cuenta
          </a>
        </div>
      </footer>
    </div>
  )
}