// features/auth/register/hooks/useRegisterForm.ts
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/model/useAuthStore"
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'



export function useRegisterForm() {
  const router = useRouter()
  const { register, loginWithGoogle, isLoading } = useAuthStore()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof typeof formData, value: string) => {
    const sanitizedValue = field === 'name' ? value.replace(/\s/g, '') : value
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const validateUsername = (name: string) => {
    const usernameRegex = /^[a-zA-Z0-9._]+$/
    
    if (!name.trim()) return "El nombre de usuario es obligatorio"
    if (name.length < 3) return "Mínimo 3 caracteres"
    if (name.length > 20) return "Máximo 20 caracteres"
    if (!usernameRegex.test(name)) return "Solo letras, números, '.' o '_'"
    if (/^[._]|[._]$/.test(name)) return "No puede empezar o terminar con '.' o '_'"
    if (/[._]{2,}/.test(name)) return "No puede tener '.' o '_' consecutivos"
    
    return ""
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    if (!email.trim()) return "El email es obligatorio"
    if (!emailRegex.test(email)) return "Email inválido"
    if (email.length > 100) return "Email demasiado largo"
    if (/[._-]{2,}/.test(email.split('@')[0])) return "Caracteres especiales consecutivos no permitidos"
    if (/^\d+@/.test(email)) return "El email no puede empezar solo con números"
    
    return ""
  }

  const validatePassword = (password: string) => {
    if (!password) return "La contraseña es obligatoria"
    if (password.length < 6) return "Mínimo 6 caracteres"
    if (password.length > 50) return "Máximo 50 caracteres"
    
    return ""
  }

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return "Confirma tu contraseña"
    if (password !== confirmPassword) return "No coinciden"
    
    return ""
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    const nameError = validateUsername(formData.name)
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword)
    
    if (nameError) newErrors.name = nameError
    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await register(formData.email, formData.password, formData.name.toLowerCase())
      router.push("/dashboard")
    } catch (err: any) {
      setErrors({ form: getAuthErrorMessage(err) })
    }
  }

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle()
    } catch (err: any) {
      setErrors({ form: getAuthErrorMessage(err) })
    }
  }

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleGoogleRegister,
  }
}