"use client";

import PuntajesEmotionsWeekly from '@/components/Emotion/PuntajesEmotionsWeekly'
import PuntajesEmotionsDayly from '@/components/Emotion/PuntajesEmotionsDaily'
import { useAuth } from '@/context/Auth'
import { motion, AnimatePresence } from 'framer-motion'
import SubscriptionPlans from '../Subscription/SubscriptionPlans';
import { ChevronDown } from 'lucide-react';


const AnimatedArrow = () => (
  <motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
  className="mt-4 text-primary flex justify-center"
>
  <ChevronDown size={32} strokeWidth={2.5} />
</motion.div>
);

const EmotionalLogView = () => {
  const { user } = useAuth();
  const role = user?.user.role; // 'free', 'premium', 'admin'
  const canAccess = role === 'premium' || role === 'admin';
  const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
  return (
    <div className="p-4 min-h-[60vh] flex flex-col items-center justify-start mt-12 space-y-12">
      {canAccess ? (
        <>
          {/* Título principal */}
<motion.div
  initial="hidden"
  animate="visible"
  variants={sectionVariants}
  className="w-full max-w-6xl mx-auto text-center my-48 px-4"
>
  <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight">
    Bitácora emocional
  </h1>
  <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
    Visualiza tu evolución emocional con resúmenes diarios, semanales y mensuales. 
    Una herramienta para reflexionar, crecer y encontrar equilibrio.
    <br />
    <br />
  </p>
    <AnimatedArrow />
</motion.div>


          {/* Análisis Diario */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="w-full max-w-4xl text-center space-y-2"
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
            className="w-full max-w-4xl text-center space-y-2"
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
  );
};

export default EmotionalLogView;
