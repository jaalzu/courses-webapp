import { z } from 'zod'

// schema para registro
export const registerSchema = z.object({
  name: z.string()
    .min(1, "El nombre es obligatorio")
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9._]+$/, "Solo letras, números, '.' o '_'")
    .refine(val => !/^[._]|[._]$/.test(val), {
      message: "No puede empezar o terminar con '.' o '_'"
    })
    .refine(val => !/[._]{2,}/.test(val), {
      message: "No puede tener '.' o '_' consecutivos"
    })
    .transform(val => val.toLowerCase()), 
  
  email: z.string()
    .min(1, "El email es obligatorio")
    .email("Email inválido")
    .max(100, "Email demasiado largo")
    .refine(val => {
      const localPart = val.split('@')[0]
      return !/[._-]{2,}/.test(localPart)
    }, {
      message: "Caracteres especiales consecutivos no permitidos"
    })
    .refine(val => !/^\d+@/.test(val), {
      message: "El email no puede empezar solo con números"
    })
    .transform(val => val.toLowerCase()), // Al final
  
  password: z.string()
    .min(1, "La contraseña es obligatoria")
    .min(6, "Mínimo 6 caracteres")
    .max(50, "Máximo 50 caracteres"),
  
  confirmPassword: z.string()
    .min(1, "Confirma tu contraseña")
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

// Tipo inferido del schema
export type RegisterFormData = z.infer<typeof registerSchema>

// sschema para login
export const loginSchema = z.object({
  email: z.string()
    .min(1, "El email es obligatorio")
    .email("Email inválido"),
  
  password: z.string()
    .min(1, "La contraseña es obligatoria")
})

export type LoginFormData = z.infer<typeof loginSchema>