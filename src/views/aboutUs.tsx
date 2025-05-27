"use client"

import SubscriptionPlans from "@/components/Subscription/SubscriptionPlans"
import { motion } from "framer-motion"
import { icon } from "leaflet"
import { Heart, Users, Shield, Target, Award, UserCircle2, Brain } from "lucide-react"
import Image from "next/image"

export default function AboutUs() {
  const values = [
    {
      icon: Heart,
      title: "Empatía",
      description: "Entendemos que cada persona vive experiencias únicas y merece ser escuchada con esmero y compromiso.",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Creemos en el poder de la conexión humana y el apoyo mutuo para sanar y crecer.",
    },
    {
      icon: Shield,
      title: "Privacidad",
      description: "Tu bienestar emocional es sagrado. Protegemos tu información con los más altos estándares.",
    },
    {
      icon: Target,
      title: "Propósito",
      description: "Nos dedicamos a hacer que la salud mental sea accesible para todas las personas.",
    },
  ]

  const stats = [
    { number: "10.000+", label: "Usuarios activos" },
    { number: "500+", label: "Centros de apoyo" },
    { number: "95%", label: "Satisfacción" },
    { number: "24/7", label: "Disponibilidad" },
  ]

  const team = [
    {
      name: "Leonado Quintero",
      role: "Fundador CEO Front-End Developer",
      description: "Full Satck, Especialista en Front-End con 5 años de experiencia.",
    },
    {
      name: "Carla Taormina",
      role: "Back-End Developer",
      description: "Experto en desarrollo de plataformas digitales para el sector salud.",
    },
    {
      name: "Jonhatan Corona",
      role: "Front-End Developer",
      description: "Full Satck, Especialista en Front-End con 5 años de experiencia.",
    },
    {
      name: "Miguel Fuenzalida",
      role: "Back-End Developer",
      image:"/miguel2.jpg",
      description: "Experto en desarrollo de plataformas digitales para el sector salud.",
    },
    {
      name: "Dhayann Uzcategui",
      role: "Front-End Developer",
      image: "/dhayan2.jpg",
      description: "Full Satck, Especialista en Front-End con 5 años de experiencia.",
    },
    {
      name: "Ariel Arzamendia",
      role: "Back-End Developer",
      description: "Experto en desarrollo de plataformas digitales para el sector salud.",
    },
    
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-teal-600/10"></div>
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutro-dark md:text-6xl lg:text-7xl">
              Acerca de 
              <span className="bg-gradient-to-r from-teal-600 to-primary bg-clip-text text-transparent"> Séntia</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-neutro-dark md:text-xl">
              Somos una plataforma dedicada a democratizar el acceso a la salud mental, conectando a las personas con
              los recursos y el apoyo que necesitan para florecer emocionalmente.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="rounded-full bg-white p-4 shadow-lg">
                <Brain className="h-12 w-12 text-teal-600" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-full bg-teal-100 p-3">
                <Target className="h-6 w-6 text-teal-600" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Nuestra Misión</h2>
              <p className="text-gray-600 leading-relaxed">
                Crear un espacio seguro y accesible donde las personas puedan explorar, entender y cuidar su bienestar
                emocional. Facilitamos el acceso a herramientas, recursos y comunidades que apoyen el crecimiento
                personal y la salud mental.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-teal-500 to-primary p-8 text-white shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-full bg-white/20 p-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h2 className="mb-4 text-2xl font-bold">Nuestra Visión</h2>
              <p className="leading-relaxed opacity-90">
                Ser la plataforma líder en salud mental digital, donde cada persona tenga acceso a los recursos

                necesarios para vivir una vida emocionalmente plena y conectada con una comunidad que la comprenda y
                apoye.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Nuestros Valores</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Los principios que guían cada decisión y acción en nuestra misión de apoyar tu bienestar emocional.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg"
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                  <value.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Nuestro Impacto</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Números que reflejan nuestro compromiso con la comunidad y el bienestar emocional.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-2 text-4xl font-bold text-teal-600 md:text-5xl">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Nuestro Equipo</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Profesionales apasionados por hacer que la salud mental sea accesible para todos.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg"
              >
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                  {member.image?
                  ( <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />):(<UserCircle2 className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full "/>)}
                 
                  
                </div>
                <h3 className="mb-1 text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-teal-600">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-r from-primary-light to-secondary p-8 text-center text-white md:p-12"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">¿Listo para comenzar tu viaje?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
              Únete a nuestra comunidad y comienza a cuidar tu bienestar emocional hoy mismo.
            </p>
            <SubscriptionPlans />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
