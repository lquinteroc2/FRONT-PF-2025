"use client";

import PuntajesEmotionsWeekly from '@/components/Emotion/PuntajesEmotionsWeekly'
import PuntajesEmotionsDayly from '@/components/Emotion/PuntajesEmotionsDaily'
import { useAuth } from '@/context/Auth'
import { motion, AnimatePresence } from 'framer-motion'
import SubscriptionPlans from '../Subscription/SubscriptionPlans';
import { ChevronDown } from 'lucide-react';

export const AnimatedArrow = () => {
  const handleClick = () => {
    const target = document.getElementById("emotion-list");
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 80; // Ajusta el -80 si quieres más espacio
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.2, filter: "brightness(1.5)" }}
      className="mt-8 text-primary flex justify-center cursor-pointer"
    >
      <ChevronDown size={36} strokeWidth={2.5} />
    </motion.div>
  );
};


const EmotionalLogView = () => {
  const { user } = useAuth();
  const role = user?.user.role; // 'free', 'premium', 'admin'
  const canAccess = role === 'premium' || role === 'admin';
  const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
  return (
    <>
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
    🧠✨ Bitácora Emocional
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
  >
    Visualiza tu evolución emocional con resúmenes diarios, semanales y mensuales.
    <br />
    Una herramienta para reflexionar, crecer y encontrar equilibrio 🌱
  </motion.p>

  <AnimatedArrow />
</motion.div>


  <div
    className="p-4 min-h-[60vh] flex flex-col items-center justify-start selection:space-y-12"
  ></div>
    <div 
    id="emotion-list" className="p-4 min-h-[60vh] flex flex-col items-center justify-start selection:space-y-12">
      {canAccess ? (
        <>
          {/* Análisis Diario */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="w-full max-w-4xl text-center space-y-2 mb-8"
          >
            <h2 className="text-xl font-semibold text-neutro-dark">Resumen diario</h2>
            <p className="text-sm text-gray-600">
              Este gráfico muestra tus emociones registradas durante las últimas 24 horas. <br /> Úsalo para reconocer tus patrones emocionales más inmediatos y ajustar tu bienestar día a día.
            </p>
            <PuntajesEmotionsDayly />
          </motion.section>

          {/* Análisis Semanal */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="w-full max-w-4xl text-center space-y-2 mb-8"
          >
            <h2 className="text-xl font-semibold text-neutro-dark">Resumen semanal</h2>
            <p className="text-sm text-gray-600">
              Observa cómo han fluctuado tus emociones durante los últimos 7 días. <br /> Este resumen te ayuda a detectar tendencias, identificar eventos clave y darte perspectiva.
            </p>
            <PuntajesEmotionsWeekly />
          </motion.section>

          {/* Análisis Mensual */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="w-full max-w-4xl text-center space-y-2"
          >
            <h2 className="text-xl font-semibold text-neutro-dark">Resumen mensual</h2>
            <p className="text-sm text-gray-600">
              Pronto podrás visualizar un panorama completo de tu estado emocional de los últimos 30 días. <br /> Ideal para observar tu progreso emocional a largo plazo.
            </p>
            <div className="text-sm text-gray-500 italic">
              Próximamente disponible.
            </div>
          </motion.section>
        </>
      ) : (
        <motion.div
          className="bg-neutro-light rounded-lg p-8 max-w-xl w-full shadow-lg text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-neutro-dark text-lg md:text-xl leading-relaxed">
            Mejora tu experiencia suscribiéndote a{' '}
            <strong className="text-primary font-bold">Premium</strong> para acceder a tus estadísticas diarias, semanales y mensuales de emociones.
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
  );
};

export default EmotionalLogView;
