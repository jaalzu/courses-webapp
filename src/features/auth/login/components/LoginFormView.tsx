"use client"

import Image from 'next/image'
import { Button, Input } from "@/shared/ui"
import { LockIcon, EnvelopeIcon } from "../../shared/icons/Icons"
import type { FieldErrors } from "react-hook-form"
import type { UseFormRegister } from "react-hook-form"
import type { LoginFormData } from "@/features/auth/lib/schemas"

interface LoginFormViewProps {
  register: UseFormRegister<LoginFormData>
  errors: FieldErrors<LoginFormData>
  serverError?: string
  isLoading: boolean
  onSubmit: (e: React.FormEvent) => void
  onGoogleLogin: () => void
  onAdminDemo: () => void 
}

export function LoginFormView({
  register,
  errors,
  serverError,
  isLoading,
  onSubmit,
  onGoogleLogin,
  onAdminDemo, // <--- La recibimos
}: LoginFormViewProps) {
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
        className="w-full flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-800 hover:text-white border-black transition-all"
        onClick={onGoogleLogin}
        disabled={isLoading}
        type="button"
      >
        <Image src="/icons/svg/google-icon.svg" alt="Google" width={18} height={18} />
        <span className="text-lg font-medium">Continuar con Google</span>
      </Button>

      {/* --- BOTÓN ADMIN DEMO --- */}
      <Button 
        variant="ghost" 
        size="sm"
        className="w-full border border border-gray-300 text-gray-500 hover:bg-gray-50 text-[12px] h-8"
        onClick={onAdminDemo}
        type="button"
      >
        Entrar como Admin (Demo)
      </Button>
      

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-background px-4 text-muted-foreground">o con email</span>
        </div>
      </div>

      {/* Error General del servidor */}
      {serverError && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2.5 rounded-xl text-xs font-medium animate-shake">
          {serverError}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <div className="relative">
            <EnvelopeIcon 
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                errors.email ? 'text-red-500' : 'text-gray-400'
              }`} 
            />
            <Input
              type="email"
              placeholder="chef@gastronomy.com"
              className={`pl-10 h-11 rounded-xl transition-all ${
                errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              disabled={isLoading}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-500 ml-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="password"
              placeholder="Contraseña"
              className="pl-10 h-11 rounded-xl"
              disabled={isLoading}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-500 ml-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full h-11 font-bold rounded-xl bg-black hover:bg-gray-800 transition-all active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? "Validando credenciales..." : "Iniciar Sesión"}
        </Button>
      </form>

      <footer className="space-y-4 pt-2">
        <div className="text-center">
          <a 
            href="#" 
            className="text-xs text-muted-foreground hover:text-black transition-colors underline-offset-4 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          ¿Nuevo en la academia?{" "}
          <a 
            href="/register" 
            className="text-black font-bold hover:underline underline-offset-4"
          >
            Crea una cuenta
          </a>
        </div>
      </footer>
    </div>
  )
}