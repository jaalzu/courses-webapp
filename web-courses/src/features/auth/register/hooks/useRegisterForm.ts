import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/model/useAuthStore"
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'
import { registerSchema, type RegisterFormData } from "@/features/auth/lib/schemas"
import { useState } from "react"

export function useRegisterForm() {
  const router = useRouter()
  const { register: registerUser, loginWithGoogle, isLoading } = useAuthStore()
  const [serverError, setServerError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur", 
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("")
    
    try {
      // data.name y data.email ya vienen en lowercase por el schema
      await registerUser(data.email, data.password, data.name)
      router.push("/dashboard")
    } catch (err: any) {
      const errorMsg = getAuthErrorMessage(err)
      
      // Si el error es específico de un campo, asignarlo al campo
      if (errorMsg.includes('email') && errorMsg.includes('registrado')) {
        setError('email', { message: 'Este email ya está registrado' })
      } else {
        setServerError(errorMsg)
      }
    }
  }

  const handleGoogleRegister = async () => {
    setServerError("")
    
    try {
      await loginWithGoogle()
    } catch (err: any) {
      setServerError(getAuthErrorMessage(err))
    }
  }

  return {
    register, // Función de react-hook-form para registrar inputs
    handleSubmit: handleSubmit(onSubmit),
    errors,
    serverError,
    isLoading: isLoading || isSubmitting,
    handleGoogleRegister,
  }
}