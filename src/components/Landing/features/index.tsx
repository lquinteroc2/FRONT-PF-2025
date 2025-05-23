"use client"

import { motion } from "framer-motion"
import { BookHeart, MapPin, MessageSquareText, BarChart4 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <BarChart4 className="h-10 w-10 text-primary" />,
    title: "Diario emocional",
    description:
      "Registra cómo te sientes cada día y visualiza tu progreso emocional a través del tiempo con gráficos intuitivos.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: "Mapa de bienestar",
    description:
      "Encuentra centros de ayuda, terapeutas y grupos de apoyo cercanos a ti, filtrados según tus necesidades específicas.",
  },
  {
    icon: <MessageSquareText className="h-10 w-10 text-primary" />,
    title: "Chatbot de apoyo",
    description:
      "Un compañero virtual que te escucha, ofrece consejos y te guía con ejercicios de respiración y meditación.",
  },
  {
    icon: <BookHeart className="h-10 w-10 text-primary" />,
    title: "Recursos personalizados",
    description: "Accede a artículos, meditaciones y podcasts seleccionados según tu estado emocional y necesidades.",
  },
]

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Funcionalidades principales</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Séntia te ofrece herramientas completas para cuidar tu bienestar emocional y conectarte con recursos
            locales.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-none shadow-lg transition-all duration-200 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
