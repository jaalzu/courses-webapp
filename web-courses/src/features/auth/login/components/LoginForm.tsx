// features/auth/components/LoginForm.tsx
"use client"

import { useLoginForm } from "@/features/auth/login/hooks/useLoginForm"
import { LoginFormView } from "./LoginFormView"

export function LoginForm() {
  const {
    formData,
    errors,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleGoogleLogin,
    validateEmail,
  } = useLoginForm()

  return (
    <LoginFormView
      formData={formData}
      errors={errors}
      isLoading={isLoading}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
      onEmailBlur={validateEmail}
    />
  )
}