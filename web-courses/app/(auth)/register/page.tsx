import { RegisterForm } from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 md:w-1/2 flex items-center justify-center p-6 h-screen">
        <RegisterForm />
      </div>
      <div className="hidden md:flex md:w-1/2 h-screen">
        <img
          src="/login-bronson.webp"
          alt="Ilustración"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
