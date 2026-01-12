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
  } = useLoginForm()

  return (
    <LoginFormView
      register={register}
      errors={errors}
      serverError={serverError}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
    />
  )
}