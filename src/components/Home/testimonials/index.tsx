"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

const testimonials = [
  {
    name: "María G.",
    role: "Usuaria desde 2023",
    content:
      "MindMap me ha ayudado a entender mis patrones emocionales y encontrar recursos que realmente funcionan para mí. El chatbot es como tener un amigo que siempre está disponible.",
    avatar: "MG",
  },
  {
    name: "Carlos R.",
    role: "Usuario desde 2022",
    content:
      "Gracias a MindMap encontré un grupo de apoyo cerca de mi casa que ha sido fundamental en mi proceso. La aplicación es intuitiva y realmente útil.",
    avatar: "CR",
  },
  {
    name: "Laura P.",
    role: "Psicóloga colaboradora",
    content:
      "Como profesional, valoro mucho la forma en que MindMap conecta a las personas con recursos locales. Es una herramienta que recomiendo a todos mis pacientes.",
    avatar: "LP",
  },
]

export default function Testimonials() {
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
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Lo que dicen nuestros usuarios</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Descubre cómo MindMap está ayudando a personas como tú a mejorar su bienestar emocional
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-gray-700">{testimonial.content}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center">
                    <Avatar className="mr-4 h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={testimonial.name} />
                      <AvatarFallback className="bg-teal-100 text-teal-800">{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
