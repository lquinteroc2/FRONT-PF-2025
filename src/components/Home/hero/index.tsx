"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-teal-200 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-2 inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-800"
              >
                Tu red de bienestar emocional local
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span className="block">Cuida tu mente con</span>
                <span className="block text-teal-600">MindMap</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-md text-lg text-gray-600"
            >
              Una plataforma donde puedes registrar tu estado emocional, encontrar recursos de salud mental y conectar
              con grupos de apoyo cercanos.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Comenzar ahora
              </Button>
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Saber más
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative mx-auto h-[400px] w-full max-w-md rounded-2xl shadow-xl md:h-[500px]"
          >
            <Image
              src="/placeholder.svg?height=500&width=400"
              alt="MindMap App Preview"
              fill
              className="rounded-2xl object-cover"
              priority
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
