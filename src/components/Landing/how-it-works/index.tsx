"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    title: "Regístrate y crea tu perfil",
    description: "Crea una cuenta en Séntia para comenzar tu viaje de bienestar emocional.",
  },
  {
    title: "Registra tu estado emocional",
    description: "Utiliza nuestro diario emocional para hacer seguimiento de cómo te sientes cada día.",
  },
  {
    title: "Explora recursos cercanos",
    description: "Encuentra profesionales y grupos de apoyo en tu zona a través de nuestro mapa interactivo.",
  },
  {
    title: "Recibe apoyo personalizado",
    description: "Nuestro chatbot te ofrece recursos y ejercicios adaptados a tus necesidades específicas.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">¿Cómo funciona?</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Comienza tu camino hacia el bienestar emocional en cuatro simples pasos
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-teal-200 md:left-1/2 md:-ml-0.5"></div>

            {/* Steps */}
            {steps.map((step, index) => (
              <div key={index} className="mb-12 md:mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex md:items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-white md:mx-auto md:h-12 md:w-12">
                    <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
