"use client";

import React, { JSX, useEffect, useState } from "react";
import { emotionsHelper } from "@/components/Emotion/emotionsHelper";
import { EmotionAdmin } from "@/components/Emotion/emotionsHelper";
import { useAuth } from "@/context/Auth";
import emotionCreateHelper from "./emotionCreateHelper"; // Assuming this path is correct
import { useToast } from "@/components/ui/use-toast";
import SubscriptionPlans from "../Subscription/SubscriptionPlans";
import { Button } from "../ui/button";

// Helper for Tailwind transition classes
const getStepTransitionClasses = (isActive: boolean) => 
  `transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 absolute invisible'}`;


export default function EmotionForm({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState<"emotion" | "intensity" | "comment" | "done">("emotion");
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionAdmin | null>(null);
  const [emotions, setEmotions] = useState<EmotionAdmin[]>([]);
  const [intensity, setIntensity] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const { user , setUser} = useAuth();
  const [isLoading, setIsLoading] = useState(false); // For submit button loading state
  const { toast } = useToast();

useEffect(() => {
  const token = user?.token;

  if (!token) {
    console.warn("⚠️ No hay token dentro de loginUser.");
    return;
  }

  emotionsHelper(token)
    .then(setEmotions)
    .catch((err) => console.error("Error fetching emotions:", err));
}, []);


  const handleEmotionSelect = (emotion: EmotionAdmin) => {
    setSelectedEmotion(emotion);
    setCurrentStep("intensity");
  };

  const handleIntensitySelect = (level: number) => {
    setIntensity(level);
    setCurrentStep("comment");
  };

  const handleBack = () => {
    if (currentStep === "comment") {
      setCurrentStep("intensity");
    } else if (currentStep === "intensity") {
      setCurrentStep("emotion");
    }
  };

 const handleSubmit = async () => {
  if (selectedEmotion && intensity && user?.user.id) {
    setIsLoading(true);
    try {
      const token = user?.token;

      await emotionCreateHelper(
        {
          userId: user.user.id,
          emotionId: selectedEmotion.id.toString(),
          intensity,
          comment,
        },
        token
      );

      // Si todo salió bien, avanzamos a done
      setCurrentStep("done");

    } catch (error: any) {
      console.error("❌ Error al enviar emoción:", error);

      // Por defecto el mensaje genérico
      let description: string | JSX.Element = "Hubo un problema al registrar tu emoción. Intenta de nuevo.";

      // Mensaje personalizado según el error del backend
      const backendMessage = error?.response?.data?.message || error.message || "";
if (
  backendMessage.includes("límite de 1 estados por día para tu plan (free)") ||
  backendMessage.includes("límite de 5 estados por día para tu plan (premium)")
) {
 description = (
  <div className="flex flex-col items-center gap-2 text-center">
    <span>
      Has alcanzado el límite diario de registros emocionales. <br />
      En el plan <strong>Free</strong> puedes registrar 1 emoción por día. <br />
      En el plan <strong>Premium</strong> puedes registrar hasta 5 por día.
    </span>

    {user?.user.role !== "premium" && (
      <>
        <span>¿Quieres aumentar tu límite? ¡Suscríbete a Premium!</span>
        <SubscriptionPlans />
      </>
    )}
  </div>
);

} else if (backendMessage.includes("UUID")) {
  description = "El ID de usuario o emoción no es válido.";
}


      toast({
        variant: "destructive",
        title: "Error al Registrar Emoción", // Título centrado
        description,
      });
    } finally {
      setIsLoading(false);
    }
  }
};



  if (currentStep === "done") {
    return (
      <div className="text-center p-8 flex flex-col items-center space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-neutro-dark">¡Emoción Registrada!</h2>
        {selectedEmotion && (
          <p className="text-lg text-neutro-dark">
            Has registrado <strong className="text-primary-dark">{selectedEmotion.name}</strong> {selectedEmotion.emoji}.
          </p>
        )}
        <p className="text-base  text-neutro-dark">{user?.user.name} entiendo te sientes en este momento con {selectedEmotion?.name}
          <br/> <br/> <span className="text-xl font-semibold  text-neutro-dark">{selectedEmotion?.reflexion}</span>
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-primary text-neutro-light px-8 py-3 rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300 active:scale-95"
        >
          Cerrar
        </button>
      </div>
    );
  }
  
  const renderStepIndicator = () => {
    const steps = ["Emoción", "Intensidad", "Comentario"];
    const currentStepIndex = currentStep === "emotion" ? 0 : currentStep === "intensity" ? 1 : 2;

    return (
      <div className="flex justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
        {steps.map((label, index) => (
          <div key={label} className="flex flex-col items-center">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
              ${index === currentStepIndex ? 'bg-primary border-primary-dark text-neutro-light scale-110' : 
               index < currentStepIndex ? 'bg-primary-light border-primary text-neutro-light' : 
               'bg-neutro-light border-neutro text-neutro-dark'}`}
            >
              {index < currentStepIndex ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              ) : (index + 1)}
            </div>
            <span className={`mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${index === currentStepIndex ? 'text-primary' : 'text-neutro-dark'}`}>{label}</span>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="p-2 sm:p-4 w-full relative"> {/* Added relative for positioning step content */}
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (currentStep === "comment") handleSubmit();
        }}
      >
        {renderStepIndicator()}

        <div className="relative min-h-[250px] sm:min-h-[300px]"> {/* Container to manage step transitions */}
          {/* Step 1: Select Emotion */}
          <div className={getStepTransitionClasses(currentStep === "emotion")}>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center text-neutro-dark">
              ¿Cuál de estas emociones sientes?
            </h2>
            {emotions.length === 0 && <p className="text-center text-neutro-dark">Cargando emociones...</p>}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 justify-center max-h-[40vh] overflow-y-auto p-1">
              {emotions.map((emotion: EmotionAdmin) => (
                <button
                  key={emotion.id}
                  type="button"
                  title={emotion.name}
                  onClick={() => handleEmotionSelect(emotion)}
                  className="relative group text-3xl sm:text-4xl p-3 sm:p-4 rounded-xl hover:bg-primary-light transition-all duration-200 flex items-center justify-center aspect-square
                             focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-primary-light"
                >
                  <span>{emotion.emoji}</span>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                                   opacity-0 group-hover:opacity-100 group-focus:opacity-100
                                   bg-neutro-dark text-neutro-light text-xs px-2 py-1 rounded-md shadow-lg 
                                   pointer-events-none z-10 whitespace-nowrap transition-opacity duration-300">
                    {emotion.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Intensity */}
          <div className={getStepTransitionClasses(currentStep === "intensity")}>
            {selectedEmotion && (
              <>
                <h2 className="text-xl sm:text-2xl font-semibold mb-1 text-center text-neutro-dark">
                  Intensidad de {selectedEmotion.name.toLowerCase()} {selectedEmotion.emoji}
                </h2>
                <p className="text-sm text-neutro-dark mb-4 sm:mb-6 text-center">Del 1 (muy baja) al 5 (muy alta)</p>
                
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleIntensitySelect(i + 1)}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 text-lg font-semibold transition-all duration-200 transform hover:scale-110
                                  ${intensity === i + 1
                                    ? "bg-primary border-primary-light text-neutro-light shadow-lg scale-110"
                                    : "bg-neutro-light border-neutro hover:border-primary hover:bg-primary/10 text-gray-700"
                                  } focus:outline-none focus:ring-2 focus:ring-primary-dark`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-6 sm:mt-8 text-center">
                  <button type="button" onClick={handleBack} className="text-sm text-primary hover:underline">
                    &larr; Volver a emociones
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Step 3: Add Comment & Submit */}
          <div className={getStepTransitionClasses(currentStep === "comment")}>
            {selectedEmotion && intensity && (
              <>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-neutro-dark">
                  ¿Porque te sientes asi?
                </h2>
                <p className="text-center mb-1 text-neutro-dark">
                  Te sientes <strong className="text-primary">{selectedEmotion.name} {selectedEmotion.emoji}</strong> con intensidad <strong className="text-primary">{intensity}</strong>.
                </p>
                <p className="text-sm text-neutro-dark mb-4 text-center">(Escribe un Comentario)</p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ej: Me siento así porque..."
                  maxLength={300}
                  className="w-full p-3 border border-neutro rounded-lg resize-none h-28 sm:h-32 focus:ring-2 focus:ring-primary focus:border-primary-dark transition-shadow"
                />
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                  <button type="button" onClick={handleBack} className="text-sm text-primary hover:underline px-4 py-2 rounded-md hover:bg-neutro-light transition-colors">
                    &larr; Cambiar intensidad
                  </button>
                   <Button
  onClick={handleSubmit}
  type="submit"
  disabled={isLoading || comment.trim() === ''}
  className="bg-primary text-neutro-light px-8 py-3 rounded-lg shadow-md hover:bg-primary transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
>
  {isLoading ? (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutro-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ) : "Confirmar Emoción"}
</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}