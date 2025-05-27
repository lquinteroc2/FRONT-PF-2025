"use client"

import { Field, ErrorMessage } from "formik"

interface FormFieldProps {
  name: string
  label: string
  type?: string
  placeholder?: string
}

export function FormField({ name, label, type = "text", placeholder }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-neutro-dark">
        {label}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-neutro-dark px-3 py-2 text-sm focus:border-primary-dark focus:outline-none focus:ring-1 focus:ring-primary-dark"
      />

      <ErrorMessage name={name} component="div" className="text-sm font-medium text-red-600" />
    </div>
  )
}
