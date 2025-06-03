"use client"

import { AnimatedArrow } from "@/components/Emotion/EmotionalLogView"
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
    <div className="min-h-screen  font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
         <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: true }}
  className="w-full max-w-6xl mx-auto text-center mt-56 mb-40 px-4"
>
  <motion.h1
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight drop-shadow-[0_0_15px_rgba(109,40,217,0.4)]"
  > <span className="inline-flex items-center">
    <Brain className="ml-1 h-12 w-12 text-primary-dark" />
  </span>
     Acerca de Séntia
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    className="text-base md:text-lg text-neutro-dark font-medium max-w-2xl mx-auto"
  >
    Somos una plataforma dedicada a democratizar el acceso a la salud mental, conectando a las personas con
    los recursos y el apoyo que necesitan para florecer emocionalmente.
  </motion.p>

   <AnimatedArrow />
</motion.div>


      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div id="emotion-list" className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-neutro-ice p-8 shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-full bg-neutro-ice p-3">
                <Target className="h-6 w-6 text-primary-dark" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-neutro-dark">Nuestra Misión</h2>
              <p className="text-neutro-dark leading-relaxed">
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
              className="rounded-2xl bg-gradient-to-br from-primary to-neutro p-8 text-neutro-ice shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-full bg-white/20 p-3">
                <Award className="h-6 w-6 text-neutro-ice" />
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
      <section className="bg-neutro-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-neutro-dark md:text-4xl">Nuestros Valores</h2>
            <p className="mx-auto max-w-2xl text-neutro-dark">
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
                className="rounded-xl bg-neutro-ice p-6 text-center shadow-md transition-all hover:shadow-lg"
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutro-light">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-neutro-dark">{value.title}</h3>
                <p className="text-sm text-neutro-dark">{value.description}</p>
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
            <h2 className="mb-4 text-3xl font-bold text-neutro-dark md:text-4xl">Nuestro Impacto</h2>
            <p className="mx-auto max-w-2xl text-neutro-dark">
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
                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">{stat.number}</div>
                <div className="text-neutro-dark">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-neutro-ice py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-neutro-dark md:text-4xl">Nuestro Equipo</h2>
            <p className="mx-auto max-w-2xl text-neutro-dark">
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
                className="rounded-xl bg-neutro-ice p-6 text-center shadow-md transition-all hover:shadow-lg"
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
                <h3 className="mb-1 text-xl font-semibold text-neutro-dark">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-primary-dark">{member.role}</p>
                <p className="text-sm text-neutro-dark">{member.description}</p>
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
            className="rounded-2xl bg-gradient-to-r from-neutro to-primary-dark p-8 text-center text-neutro-ice md:p-12"
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
