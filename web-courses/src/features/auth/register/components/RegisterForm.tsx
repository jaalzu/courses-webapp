// features/auth/register/components/RegisterForm.tsx
"use client"

import { useRegisterForm } from "@/features/auth/register/hooks/useRegisterForm"
import { RegisterFormView } from "./RegisterFormView"

export function RegisterForm() {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleGoogleRegister,
  } = useRegisterForm()

  return (
    <RegisterFormView
      formData={formData}
      errors={errors}
      isLoading={isLoading}
      onFieldChange={handleChange}
      onSubmit={handleSubmit}
      onGoogleRegister={handleGoogleRegister}
    />
  )
}