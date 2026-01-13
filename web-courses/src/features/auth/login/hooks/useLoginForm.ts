import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/model/useAuthStore"
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'
import { loginSchema, type LoginFormData } from "@/features/auth/lib/schemas"
import { useState } from "react"

export function useLoginForm() {
  const router = useRouter()
  const { login, loginWithGoogle, isLoading } = useAuthStore()
  const [serverError, setServerError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError("")
    
    try {
      await login(data.email, data.password)
      window.location.href = '/dashboard' // Hard reload para que el proxy detecte la sesión
    } catch (err: any) {
      const errorMsg = getAuthErrorMessage(err)
      
      setServerError(errorMsg)
    }
  }

  const handleGoogleLogin = async () => {
    setServerError("")
    
    try {
      await loginWithGoogle()
    } catch (err: any) {
      setServerError(getAuthErrorMessage(err))
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    serverError,
    isLoading: isLoading || isSubmitting,
    handleGoogleLogin,
  }
}