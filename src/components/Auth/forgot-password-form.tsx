"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

// Esquema de validación
const validationSchema = Yup.object({
  email: Yup.string().email("Ingrese un email válido").required("El email es obligatorio"),
})

// Tipos
interface FormValues {
  email: string
}

interface ForgotPasswordFormProps {
  onSuccess?: (email: string) => void
}

export default function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [emailSent, setEmailSent] = useState("")

  const initialValues: FormValues = {
    email: "",
  }

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    setSubmitStatus("loading")
    setSubmitMessage("")

    try {
      const response = await fetch("https://sentia-back.onrender.com/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: values.email}),
      })

      const data = await response.json()
      console.log("Response data:", data)

      if (response.ok) {
        setSubmitStatus("success")
        setEmailSent(values.email)
        setSubmitMessage("Te hemos enviado un enlace para restablecer tu contraseña.")
        onSuccess?.(values.email)
      } else {
        throw new Error(data.message || "Error al enviar el email")
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage(error instanceof Error ? error.message : "Error inesperado. Inténtalo de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  // Vista de éxito
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
          <h2 className="text-2xl font-bold text-gray-900">Email Enviado</h2>
          <p className="mt-2 text-sm text-gray-600">Hemos enviado un enlace de restablecimiento de contraseña a:</p>
          <p className="mt-1 font-medium text-teal-600">{emailSent}</p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Revisa tu bandeja de entrada</p>
              <p>El enlace expirará en 15 minutos. Si no ves el email, revisa tu carpeta de spam.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => {
              setSubmitStatus("idle")
              setEmailSent("")
              setSubmitMessage("")
            }}
            variant="outline"
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar otro email
          </Button>

          <Link href="/login" className="block">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            ¿No recibiste el email?{" "}
            <button
              onClick={() => {
                setSubmitStatus("idle")
                setEmailSent("")
              }}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Intentar con otro email
            </button>
          </p>
        </div>
      </motion.div>
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
          <Mail className="h-8 w-8 text-teal-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900">¿Olvidaste tu contraseña?</h2>
        <p className="mt-2 text-sm text-gray-600">No te preocupes, te enviaremos un enlace para restablecerla</p>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form className="space-y-6">
            <Field name="email">
              {({ field, meta }: any) => (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      maxLength={40}
                      className={`pl-10 ${
                        meta.touched && meta.error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : meta.touched && !meta.error
                            ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                            : ""
                      }`}
                    />
                    {meta.touched && !meta.error && values.email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                </div>
              )}
            </Field>

            {/* Mensaje de estado */}
            {submitStatus === "error" && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{submitMessage}</AlertDescription>
              </Alert>
            )}

            {/* Información adicional */}
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">¿Qué sucederá después?</p>
                <ul className="space-y-1 text-xs">
                  <li>• Recibirás un email con un enlace seguro</li>
                  <li>• El enlace expirará en 15 minutos</li>
                  <li>• Podrás crear una nueva contraseña</li>
                  <li>• Tu cuenta permanecerá segura</li>
                </ul>
              </div>
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar enlace de restablecimiento
                </>
              )}
            </Button>

            {/* Enlaces de navegación */}
            <div className="space-y-3">
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al inicio de sesión
                </Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      {/* Enlaces adicionales */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link href="/registro" className="text-teal-600 hover:text-teal-700 font-medium">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
