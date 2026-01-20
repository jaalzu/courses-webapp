"use client"

import { useLoginForm } from "@/features/auth/login/hooks/useLoginForm"
import { LoginFormView } from "./LoginFormView"

export function LoginForm() {
  const {
    register,
    handleSubmit,
    errors,
    serverError,
    isLoading,
    handleGoogleLogin,
    setValue, // <--- Sacamos esto del hook (react-hook-form)
  } = useLoginForm()

  const handleAdminDemo = () => {
    setValue("email", "admin@demo.com")
    setValue("password", "pepe321")
    setTimeout(() => {
      handleSubmit() 
    }, 800)
  }

  return (
    <LoginFormView
      register={register}
      errors={errors}
      serverError={serverError}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
      onAdminDemo={handleAdminDemo} // <--- Pasamos la nueva función
    />
  )
}