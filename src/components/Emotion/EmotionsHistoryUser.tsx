"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import emotionHistoryHelper, { RegisteredEmotion } from "./emotionHistoryHelper";

export default function EmotionsHistoryUser() {
  const [emotions, setEmotions] = useState<RegisteredEmotion[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Iniciar con isLoading en true
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

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
    <div className="w-full p-4 sm:p-6 md:p-8 lg:w-2/5">
      <div className="mb-6 lg:mt-16 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center w-full">
          Tu Historial de Emociones
        </h2>
      </div>

      <ul className="space-y-6">
        {emotions.map((e) => (
          <li
            key={e.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer"
            onClick={() => toggleExpand(e.id)}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="text-3xl sm:text-4xl">{e.emotion.emoji}</span>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                    <h3 className="text-xl font-semibold text-neutro-dark group-hover:text-primary-dark transition-colors duration-300 truncate">
                      {e.emotion.name}
                    </h3>
                    <p className="text-xs text-neutro-dark mt-1 sm:mt-0 flex-shrink-0 ml-0 sm:ml-2">
                      {new Date(e.date || e.createdAt).toLocaleString('es-ES', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <IntensityDots level={e.intensity} />

                  {/* Mostrar comentario solo si está expandido */}
                  {expandedId === e.id && e.comment && (
                    <div className="mt-3 text-neutro-dark bg-neutro-light p-3 rounded-md border border-primary text-sm break-words">
                      <strong className="font-medium text-neutro-dark">Comentario:</strong> {e.comment}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
