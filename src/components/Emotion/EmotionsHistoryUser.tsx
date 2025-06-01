"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import emotionHistoryHelper, { RegisteredEmotion } from "./emotionHistoryHelper";
import { Button } from "../ui/button";
import SubscriptionPlans from "../Subscription/SubscriptionPlans";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedArrow } from "./EmotionalLogView";

export default function EmotionsHistoryUser() {
  const [emotions, setEmotions] = useState<RegisteredEmotion[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Iniciar con isLoading en true
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
    const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);

  const handleSeeMoreClick = () => {
    setShowSubscriptionPlans(true);
  };

    const handleClosePlans = () => {
    setShowSubscriptionPlans(false);
  };

const MotionDiv = motion('div');
const userRole = user?.user.role ?? "free"; // detecta el rol, por defecto "free"
const maxFreeEmotions = 3;
const isFreeUser = userRole === "free";

const emotionsToShow = isFreeUser ? emotions.slice(0, maxFreeEmotions) : emotions;

const toggleExpand = (id: string | number) => {
  setExpandedId(prev => (prev === id ? null : id));
};

  useEffect(() => {
    if (user?.user.id) {
      setIsLoading(true);
      setError(null);
      emotionHistoryHelper(user.user.id)
        .then(fetchedEmotions => {
          // Ordenar emociones por fecha, las más nuevas primero
          const sortedEmotions = fetchedEmotions.sort((a, b) =>
            new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime()
          );
          setEmotions(sortedEmotions);
        })
        .catch(err => {
          console.error(err);
          setError("No se pudieron cargar tus emociones. Inténtalo de nuevo más tarde.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Si no hay usuario, no cargar y asegurarse de que no esté en estado de carga
      setEmotions([]); // Limpiar emociones si el usuario cierra sesión, por ejemplo
      setIsLoading(false);
    }
  }, [user]); // Dependencia del efecto: el objeto user
  
  const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

  // Componente interno para mostrar los puntos de intensidad
  const IntensityDots = ({ level }: { level: number }) => (
    <div className="flex space-x-1 items-center">
      <span className="text-sm font-semibold text-neutro-dark mr-1">Intensidad:</span>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`h-3 w-3 rounded-full inline-block transition-colors duration-300 ${
            i < level ? 'bg-primary-dark' : 'bg-neutro-light'
          }`}
          title={`Intensidad ${i + 1} de 5`} // Tooltip en español
        ></span>
      ))}
      <span className="text-sm font-medium text-primary-dark ml-1">({level}/5)</span>
    </div>
  );

  if (isLoading) {
    return (
      // Contenedor principal con la clase de ancho responsive aplicada también aquí para consistencia
      <div className="mx-auto w-full p-4 sm:p-6 md:p-8 lg:w-2/5 flex justify-center items-center min-h-[300px]">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 text-lg">Cargando tu historial de emociones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full p-4 sm:p-6 md:p-8 lg:w-2/5 flex justify-center items-center min-h-[300px] text-center">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-md">
          <span className="text-5xl mb-3 inline-block">😟</span>
          <p className="text-red-700 text-lg font-semibold">¡Ups! Algo salió mal.</p>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (emotions.length === 0) {
    return (
      <div className="mx-auto w-full p-4 sm:p-6 md:p-8 lg:w-2/5 flex justify-center items-center min-h-[300px] text-center">
        <div className="bg-sky-50 border border-sky-200 p-8 rounded-xl shadow-lg"> {/* Cambiado a sky para diferenciarlo del error */}
          <span className="text-6xl mb-4 inline-block">🤔</span>
          <h2 className="text-2xl font-semibold text-sky-800 mb-2">Aún no hay nada por aquí</h2>
          <p className="text-sky-700">Parece que todavía no has registrado ninguna emoción.</p>
          <p className="text-sky-700 mt-1">¡Anímate a contarnos cómo te sientes!</p>
          {/* Opcional: Botón para navegar al registro de emociones */}
          {/* <button className="mt-6 bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary/90 transition">
            Registrar Emoción
          </button> */}
        </div>
      </div>
    );
  }

return (
  <div className="px-4">
    {/* Encabezado principal */}
<motion.div
  initial="hidden"
  animate="visible"
  variants={sectionVariants}
  className="min-h-screen w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center px-4 leading-tight drop-shadow-[0_0_15px_rgba(109,40,217,0.4)]"
>
  <motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight drop-shadow"
  >
    🧠✨ Tu Diario Emocional
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-4"
  >
    Aquí verás las emociones que has registrado. Explora lo que sentiste, reflexiona y sigue creciendo 🌱
    <br/>
    <br/>
  </motion.p>

  <AnimatedArrow />
</motion.div>


    {/* Lista de emociones */}
   <ul
  id="emotion-list"
  className="space-y-4 max-w-4xl mx-auto w-full px-4 py-12 min-h-[60vh] flex flex-col justify-start"
>

      {emotionsToShow.map((e) => (
        <motion.li
          key={e.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onClick={() => toggleExpand(e.id)}
          className="bg-white/60 backdrop-blur-md border border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300 rounded-xl p-4 cursor-pointer group"
        >
          <div className="flex items-start gap-3">
            {/* Emoji */}
            <div className="text-3xl bg-primary/10 p-3 rounded-full shadow-sm group-hover:bg-primary/20 transition">
              {e.emotion.emoji}
            </div>

            {/* Contenido */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h3 className="text-lg font-semibold text-neutro-dark group-hover:text-primary-dark transition truncate">
                  {e.emotion.name}
                </h3>
                <p className="text-xs text-neutro-dark mt-1 sm:mt-0 sm:ml-2">
                  {new Date(e.date || e.createdAt).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Intensidad */}
              <div className="mt-2">
                <IntensityDots level={e.intensity} />
              </div>

              {/* Comentario expandible */}
              <AnimatePresence initial={false}>
                {expandedId === e.id && e.comment && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 bg-neutro-light p-3 rounded-md border border-primary/10 text-sm text-neutro-dark shadow-inner">
                      <div className="font-semibold text-primary-dark mb-1 flex items-center gap-1">
                        📝 Comentario:
                      </div>
                      <p className="leading-relaxed">{e.comment}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>

    {/* Límite para usuarios gratuitos */}
    {isFreeUser && emotions.length > maxFreeEmotions && (
      <div className="mt-6 flex flex-col items-center">
        <p className="text-sm text-neutro-dark mb-3 text-center max-w-md">
          Solo puedes ver las últimas <strong>{maxFreeEmotions}</strong> emociones con la versión gratuita.
        </p>
        <button
          onClick={handleSeeMoreClick}
          className="bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary/90 transition active:scale-95"
        >
          🔓 Ver Todo el Historial
        </button>

        {/* Modal de planes de suscripción */}
        {showSubscriptionPlans && (
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={handleClosePlans}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-neutro-light rounded-2xl p-6 max-w-lg w-full relative text-neutro-ice shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <button
                  onClick={handleClosePlans}
                  className="absolute top-3 right-3 text-gray-400 hover:text-primary-dark text-xl"
                  aria-label="Cerrar modal"
                >
                  ✕
                </button>
                <div className="text-center text-neutro-dark text-lg md:text-xl font-semibold leading-relaxed mb-4">
                  🌟 <strong>¡Mejora tu experiencia con Premium!</strong><br />
                  Accede a tu historial completo, recibe análisis personalizados y desbloquea más herramientas emocionales.
                </div>
                <SubscriptionPlans />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    )}
  </div>
);
}