// features/auth/hooks/useLoginForm.ts
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/model/useAuthStore"
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'

export function useLoginForm() {
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

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }))
    if (errors.email) validateEmail(email)
  }

  const handlePasswordChange = (password: string) => {
    setFormData(prev => ({ ...prev, password }))
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

  return {
    formData,
    errors,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleGoogleLogin,
    validateEmail,
  }
}