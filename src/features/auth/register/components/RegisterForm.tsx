"use client"

import { useRegisterForm } from "@/features/auth/register/hooks/useRegisterForm"
import { RegisterFormView } from "./RegisterFormView"

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    errors,
    serverError,
    isLoading,
    handleGoogleRegister,
  } = useRegisterForm()

  return (
    <RegisterFormView
      register={register}
      errors={errors}
      serverError={serverError}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onGoogleRegister={handleGoogleRegister}
    />
  )
}