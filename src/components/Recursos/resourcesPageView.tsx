"use client";


import { useAuth } from "@/context/Auth";
import { motion } from "framer-motion";
import SubscriptionPlans from "@/components/Subscription/SubscriptionPlans";
import { AnimatedArrow } from "../Emotion/EmotionalLogView";
import ResourcesPage from "@/components/Recursos/resources-page"


export default function RecursosPageView() {

  const { user } = useAuth();
  const role = user?.user.role; // 'free' | 'premium' | 'admin' | undefined
  const canAccess = role === "premium" || role === "admin";
  const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
  return (
    <>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto text-center mt-56 px-4"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight drop-shadow-[0_0_15px_rgba(109,40,217,0.4)]"
        >
          🏥✨ Recursos Emocionales
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Encuentra fácilmente a todos los recursos, descarga y disfruta!. 🚑
        </motion.p>

        <AnimatedArrow />
      </motion.div>

      {/* Contenido principal */}
      <div
        id="emotion-list"
        className="p-4 min-h-[60vh] flex flex-col items-center justify-start mt-36 mb-24 space-y-12"
      >
        {canAccess ? (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="w-full max-w-4xl text-center space-y-2 mb-8"
          >
            <ResourcesPage />
          </motion.section>
        ) : (
          <motion.div
            className="bg-neutro-light rounded-lg p-8 max-w-xl w-full shadow-lg text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-neutro-dark text-lg md:text-xl leading-relaxed">
              Mejora tu experiencia suscribiéndote a {" "}
              <strong className="text-primary font-bold">Premium</strong> para
              acceder a los centros de ayuda disponibles y recibir asistencia
              personalizada.
            </p>
            <span className="mt-2 block text-lg font-semibold text-primary-dark">
              ¡Suscríbete Ahora!
            </span>
            <div className="mt-12 w-full max-w-4xl mx-auto px-4">
              <SubscriptionPlans />
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}
