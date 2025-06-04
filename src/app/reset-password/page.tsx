import ResetPasswordForm from "@/components/Auth/reset-password-form"


export const metadata = {
  title: "Olvidé mi contraseña - Séntia",
  description: "Restablece tu contraseña de Séntia de forma segura.",
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="flex items-center justify-center px-4 py-12">
        <ResetPasswordForm />
      </div>
    </div>
  )
}
