// features/auth/register/components/RegisterFormUI.tsx
"use client"

import Image from 'next/image'
import { Button, Input } from "@/shared/ui"
import { LockIcon, EnvelopeIcon } from "../../shared/icons/icons"


interface RegisterFormUIProps {
  formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  errors: Record<string, string>
  isLoading: boolean
  onFieldChange: (field: keyof RegisterFormUIProps['formData'], value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onGoogleRegister: () => void
}

export function RegisterFormView({
  formData,
  errors,
  isLoading,
  onFieldChange,
  onSubmit,
  onGoogleRegister,
}: RegisterFormUIProps) {
  return (
    <div className="w-full max-w-sm space-y-6 animate-in fade-in duration-500">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Crear cuenta</h1>
        <p className="text-sm text-muted-foreground italic">JavaCourses</p>
      </header>

      <Button 
        variant="outline" 
        size="lg" 
        className="w-full flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-800 hover:text-white border-black transition-all active:scale-95"
        onClick={onGoogleRegister}
        disabled={isLoading}
      >
        <Image src="/icons/svg/google-icon.svg" alt="Google" width={18} height={18} />
        <span className="text-sm font-medium">Registrarse con Google</span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-background px-4 text-muted-foreground font-bold tracking-widest text-gray-400">
            o
          </span>
        </div>
      </div>

      {errors.form && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2.5 rounded-xl text-xs font-medium text-center">
          {errors.form}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Campo: Username */}
        <div className="space-y-1">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm select-none">
              #
            </span>
            <Input 
              placeholder="nombre_usuario" 
              className={`pl-8 rounded-xl h-11 transition-all ${
                errors.name ? 'border-red-500 ring-red-100' : 'focus:border-black'
              }`}
              value={formData.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              disabled={isLoading}
            />
          </div>
          {errors.name && (
            <p className="text-[10px] text-red-500 font-bold ml-2">
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo: Email */}
        <div className="space-y-1">
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              type="email"
              placeholder="tu@email.com" 
              className={`pl-10 rounded-xl h-11 transition-all ${
                errors.email ? 'border-red-500' : 'focus:border-black'
              }`}
              value={formData.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-[10px] text-red-500 font-bold ml-2">
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo: Passwords */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                type="password"
                placeholder="Clave" 
                className={`pl-9 rounded-xl h-11 text-xs ${
                  errors.password ? 'border-red-500' : 'focus:border-black'
                }`}
                value={formData.password}
                onChange={(e) => onFieldChange('password', e.target.value)}
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-500 font-bold ml-2">
                {errors.password}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Input 
                type="password"
                placeholder="Repetir" 
                className={`pl-4 rounded-xl h-11 text-xs ${
                  errors.confirmPassword ? 'border-red-500' : 'focus:border-black'
                }`}
                value={formData.confirmPassword}
                onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[10px] text-red-500 font-bold ml-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "Creando perfil..." : "Unirse ahora"}
        </Button>
      </form>

      <footer className="text-center text-sm">
        <span className="text-muted-foreground">¿Ya eres parte?</span>{" "}
        <a href="/login" className="font-bold text-black hover:underline underline-offset-4">
          Inicia sesión
        </a>
      </footer>
    </div>
  )
}