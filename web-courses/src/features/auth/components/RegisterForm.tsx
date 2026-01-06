"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui/index"
import { Input } from "@/shared/ui/index"
import { UserIcon, LockIcon, EnvelopeIcon } from "./icons/icons"
import Image from 'next/image'
import { useAuthStore } from "@/features/auth/model/useAuthStore"
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'
import { validateName } from '@/shared/lib/supabase/queries/profiles'

export function RegisterForm() {
  const router = useRouter()
  const { register, loginWithGoogle, isLoading } = useAuthStore()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  
  // Estados de validación por campo
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  // Validación de email
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setEmailError("Email inválido")
      return false
    }
    setEmailError("")
    return true
  }

  // Validación de contraseña
  const validatePassword = (value: string) => {
    if (value.length < 6) {
      setPasswordError("Mínimo 6 caracteres")
      return false
    }
    if (value.length > 72) {
      setPasswordError("Máximo 72 caracteres")
      return false
    }
    setPasswordError("")
    return true
  }

  // Validación de confirmar contraseña
  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError("Las contraseñas no coinciden")
      return false
    }
    setConfirmPasswordError("")
    return true
  }

  // Validación del nombre al escribir
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    
    // Solo validar si ya hay error o si el usuario dejó de escribir
    if (nameError || value.length >= 3) {
      const validation = validateName(value)
      setNameError(validation.valid ? "" : validation.error || "")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validar todos los campos
    const nameValidation = validateName(name)
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword)

    // Mostrar errores específicos
    if (!nameValidation.valid) {
      setNameError(nameValidation.error || "")
      return
    }

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return
    }

    try {
      await register(email, password, name.trim())
      router.push("/dashboard")
    } catch (err: any) {
      setError(getAuthErrorMessage(err))
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
    } catch (err: any) {
      setError(getAuthErrorMessage(err))
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">o</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Nombre */}
        <div className="relative w-full">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Nombre completo" 
            className={`pl-10 w-full ${nameError ? 'border-red-500' : ''}`}
            value={name}
            onChange={handleNameChange}
            onBlur={() => {
              const validation = validateName(name)
              setNameError(validation.valid ? "" : validation.error || "")
            }}
            maxLength={50}
            required
            disabled={isLoading}
          />
          {nameError && (
            <span className="text-red-500 text-xs mt-1 block">{nameError}</span>
          )}
        </div>

        {/* Email */}
        <div className="relative w-full">
          <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            type="email" 
            placeholder="Correo electrónico" 
            className={`pl-10 w-full ${emailError ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) validateEmail(e.target.value)
            }}
            onBlur={() => validateEmail(email)}
            required
            disabled={isLoading}
          />
          {emailError && (
            <span className="text-red-500 text-xs mt-1 block">{emailError}</span>
          )}
        </div>

        {/* Contraseña */}
        <div className="relative w-full">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            type="password" 
            placeholder="Contraseña (mínimo 6 caracteres)" 
            className={`pl-10 w-full ${passwordError ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (passwordError) validatePassword(e.target.value)
              // Revalidar confirmación si ya hay algo escrito
              if (confirmPassword) validateConfirmPassword(confirmPassword)
            }}
            onBlur={() => validatePassword(password)}
            minLength={6}
            maxLength={72}
            required
            disabled={isLoading}
          />
          {passwordError && (
            <span className="text-red-500 text-xs mt-1 block">{passwordError}</span>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div className="relative w-full">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            type="password" 
            placeholder="Confirmar contraseña" 
            className={`pl-10 w-full ${confirmPasswordError ? 'border-red-500' : ''}`}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (confirmPasswordError) validateConfirmPassword(e.target.value)
            }}
            onBlur={() => validateConfirmPassword(confirmPassword)}
            required
            disabled={isLoading}
          />
          {confirmPasswordError && (
            <span className="text-red-500 text-xs mt-1 block">{confirmPasswordError}</span>
          )}
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