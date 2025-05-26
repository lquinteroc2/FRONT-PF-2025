"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-primary  to-neutro-dark py-20 text-white md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            Comienza tu viaje hacia el bienestar emocional hoy mismo
          </h2>
          <p className="mb-8 text-lg text-teal-50">
            Únete a nuestra comunidad y descubre recursos locales que pueden ayudarte. Tu bienestar emocional es
            importante.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-neutro-light  text-primary hover:bg-primary-dark">
              Registrarse gratis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-primary hover:bg-primary-dark">
              Conocer más
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
