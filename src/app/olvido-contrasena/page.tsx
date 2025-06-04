import ForgotPasswordForm from "@/components/Auth/forgot-password-form"

export const metadata = {
  title: "Olvidé mi contraseña - Séntia",
  description: "Restablece tu contraseña de Séntia de forma segura.",
}

export default function OlvidoContrasenaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="flex items-center justify-center px-4 py-12">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
