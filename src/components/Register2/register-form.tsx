"use client"

import { Form, Formik } from "formik"
import { Button } from "@/components/ui/button"
import { FormField } from "./form-field"
import { validationSchemaRegister } from "./validation-schema"
import { registerHelper } from "./register-helper"
import type { IUserDto } from "@/lib/types"
import { FORM_FIELDS } from "./form-constants"
import { useToast } from "@/components/ui/use-toast";

const INITIAL_VALUES: IUserDto = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export function RegisterForm() {
  const { toast } = useToast();
  const handleSubmit = async (values: IUserDto, { resetForm }: any) => {
    try {
      console.log("Datos enviados:", values)

      const result = await registerHelper(values, toast)

      if (result) {
        toast({
          title: "Registro Exitoso",
          description: "¡Bienvenido a Séntia!",
        })
        resetForm()
      }
    } catch (error) {
      console.error("Error en el registro:", error)
      toast({
        title: "Erro en el Registro",
        description: "No se pudo registrar, por favor intente nuevamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchemaRegister} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          {FORM_FIELDS.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-dark font-bold hover:bg-primary-dark/90 disabled:opacity-50"
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
