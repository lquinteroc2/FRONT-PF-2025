"use client"

import { motion } from "framer-motion"
import { RegisterHero } from "./register-hero"
import { RegisterForm } from "./register-form"

const MotionDiv = motion("div")

export default function RegisterView2() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary-50 md:flex-row">
      {/* Hero Section */}
      <RegisterHero />

      {/* Form Section */}
      <MotionDiv
        className="flex w-full flex-col items-center justify-center p-8 md:w-1/2"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutro-dark">Formulario de Registro</h2>
            <p className="mt-2 text-sm text-gray-600">Únete a Séntia y comienza tu viaje emocional</p>
          </div>

          <RegisterForm />
        </div>
      </MotionDiv>
    </div>
  )
}
