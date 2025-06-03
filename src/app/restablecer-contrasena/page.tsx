import ResetPasswordForm from "@/components/Auth/reset-password-form"
import { Suspense } from "react"

export const metadata = {
  title: "Restablecer contraseña - Séntia",
  description: "Crea una nueva contraseña para tu cuenta de Séntia.",
}

function ResetPasswordContent() {
  return <ResetPasswordForm />
}

export default function RestablecerContrasenaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="flex items-center justify-center px-4 py-12">
        <Suspense
          fallback={
            <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-teal-600 border-t-transparent"></div>
                <p className="mt-2 text-sm text-gray-600">Cargando...</p>
              </div>
            </div>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  )
}
