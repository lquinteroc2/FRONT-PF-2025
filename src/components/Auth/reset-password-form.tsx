"use client"

import { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Esquema de validación
const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]/,
      "La contraseña debe contener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial",
    )
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirme su contraseña"),
})

// Tipos
interface FormValues {
  password: string
  confirmPassword: string
}

export default function ResetPasswordForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
  }

  // Validar token al cargar
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false)
        setSubmitMessage("Token de restablecimiento no encontrado")
        return
      }

      try {
        const response = await fetch("https://sentia-back.onrender.com/auth/validate-reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()
        setTokenValid(data.valid)

        if (!data.valid) {
          setSubmitMessage(data.error || "Token inválido o expirado")
        }
      } catch (error) {
        setTokenValid(false)
        setSubmitMessage("Error al validar el token")
      }
    }

    validateToken()
  }, [token])

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    if (!token) return

    setSubmitStatus("loading")
    setSubmitMessage("")

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: values.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage("Contraseña restablecida exitosamente")

        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.push("/login?message=password-reset-success")
        }, 3000)
      } else {
        throw new Error(data.message || "Error al restablecer la contraseña")
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage(error instanceof Error ? error.message : "Error inesperado. Inténtalo de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  // Token inválido o expirado
  if (tokenValid === false) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Enlace Inválido</h2>
          <p className="mt-2 text-sm text-gray-600">{submitMessage}</p>
        </div>

        <div className="space-y-3">
          <Link href="/olvido-contrasena" className="block">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">Solicitar nuevo enlace</Button>
          </Link>
          <Link href="/login" className="block">
            <Button variant="outline" className="w-full">
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  // Éxito
  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
          >
            <CheckCircle className="h-8 w-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900">¡Contraseña Restablecida!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Tu contraseña ha sido actualizada exitosamente. Serás redirigido al inicio de sesión.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <div className="text-sm text-green-800">
            <p className="font-medium">¡Todo listo!</p>
            <p>Ya puedes iniciar sesión con tu nueva contraseña.</p>
          </div>
        </div>

        <Link href="/login" className="block">
          <Button className="w-full bg-teal-600 hover:bg-teal-700">Ir al inicio de sesión</Button>
        </Link>
      </motion.div>
    )
  }

  // Cargando validación de token
  if (tokenValid === null) {
    return (
      <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-teal-600" />
          <p className="mt-2 text-sm text-gray-600">Validando enlace...</p>
        </div>
      </div>
    )
  }

  // Formulario principal
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100"
        >
          <Shield className="h-8 w-8 text-teal-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900">Nueva Contraseña</h2>
        <p className="mt-2 text-sm text-gray-600">Crea una contraseña segura para tu cuenta</p>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form className="space-y-6">
            {/* Campo de contraseña */}
            <Field name="password">
              {({ field, meta }: any) => (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Nueva contraseña
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crea una contraseña segura"
                      className={`pl-10 pr-10 ${
                        meta.touched && meta.error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : meta.touched && !meta.error
                            ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                            : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
                </div>
              )}
            </Field>

            {/* Campo de confirmación */}
            <Field name="confirmPassword">
              {({ field, meta }: any) => (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirmar contraseña
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirma tu contraseña"
                      className={`pl-10 pr-10 ${
                        meta.touched && meta.error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : meta.touched && !meta.error
                            ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                            : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-600" />
                </div>
              )}
            </Field>

            {/* Indicador de fortaleza de contraseña */}
            <Field name="password">
              {({ field }: any) => {
                if (!field.value) return null

                const hasMinLength = field.value.length >= 8
                const hasUpperCase = /[A-Z]/.test(field.value)
                const hasLowerCase = /[a-z]/.test(field.value)
                const hasNumber = /\d/.test(field.value)
                const hasSpecialChar = /[@$!%*?&]/.test(field.value)

                const requirements = [
                  { met: hasMinLength, text: "Al menos 8 caracteres" },
                  { met: hasUpperCase, text: "Una letra mayúscula" },
                  { met: hasLowerCase, text: "Una letra minúscula" },
                  { met: hasNumber, text: "Un número" },
                  { met: hasSpecialChar, text: "Un carácter especial" },
                ]

                return (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Requisitos de contraseña:</p>
                    <div className="space-y-1">
                      {requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          {req.met ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <div className="h-3 w-3 rounded-full border border-gray-300" />
                          )}
                          <span className={req.met ? "text-green-600" : "text-gray-500"}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }}
            </Field>

            {/* Mensaje de estado */}
            {submitStatus === "error" && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{submitMessage}</AlertDescription>
              </Alert>
            )}

            {/* Botón de envío */}
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Restableciendo...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Restablecer contraseña
                </>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
}
