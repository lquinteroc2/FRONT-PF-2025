"use client"

import React, { useEffect, useState } from "react";
import { emotionsHelper } from "@/components/Emotion/emotionsHelper";
import { Emotion } from "@/components/Emotion/emotionsHelper"; // Asegúrate de importar correctamente tu interfaz
import { useAuth } from "@/context/Auth";
import emotionCreateHelper from "./emotionCreateHelper";

export default function EmotionForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"emotion" | "intensity" | "comment" | "done">("emotion");
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [intensity, setIntensity] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const { user } = useAuth();
  
 useEffect(() => {
    emotionsHelper()
      .then(setEmotions)
      .catch((err) => console.error(err))
  }, []); 

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setStep("intensity");
  };

  const handleIntensitySelect = (level: number) => {
    setIntensity(level);
    setStep("comment");
  };

const handleSubmit = async () => {
   if (selectedEmotion && intensity && user?.user.id) {
    try {
      const result = await emotionCreateHelper({
        userId: user.user.id,
        emotionId: selectedEmotion.id.toString(),
        intensity,
        comment,
      });

      console.log("👍 Emoción registrada:", result.emotion, result.createdAt);

      // Aquí podrías mostrar un mensaje al usuario
      alert(`Registraste la emoción ${result.emotion} el ${new Date(result.createdAt).toLocaleString()}`);
      onClose();
    } catch (error) {
      console.error("❌ Error al enviar emoción:", error);
    }
  }
};
 
  return ( 
    <form className="p-4 w-full lg:w-1/2"
       onSubmit={(e) => {
      e.preventDefault(); 
  }}>
      <h2 className="text-xl font-bold mb-4">Selecciona una emoción</h2>

      <div className="grid grid-cols-10 gap-2 justify-center">
      {emotions.map((emotion: Emotion) => (
  <button
    key={emotion.id}
    type="button"
    onClick={() => handleEmotionSelect(emotion)}
    className="relative group text-3xl p-3 rounded-full hover:bg-blue-100 transition flex items-center justify-center"
  >
    <span>{emotion.emoji}</span>
    <span className="absolute left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded mt-1 pointer-events-none z-10 whitespace-nowrap transition-opacity">
      {emotion.name}
    </span>
  </button>
))}
      </div>

      {selectedEmotion && (
        <div className="mt-6 p-4 bg-primary-light border border-neutro rounded">
          <p>
            Emoción seleccionada: <strong>{selectedEmotion.name}</strong>{" "}
            {selectedEmotion.emoji}
          </p>
        </div>
      )}

        {step === "intensity" && selectedEmotion && (
        <div className="mt-4">
          <p className="mb-2 font-semibold">
            ¿Con qué intensidad sientes {selectedEmotion.name.toLowerCase()}? {selectedEmotion.emoji}
          </p>
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleIntensitySelect(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                  intensity === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

{step === "comment" && (
  <div className="mt-4 space-y-4">
    <p className="font-medium">¿Quieres agregar algo sobre cómo te sientes?</p>
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Escribe un comentario..."
      className="w-full p-2 border rounded resize-none h-24"
    />
  </div>
)}

{step === "comment" && selectedEmotion && intensity && (
  <div className="mt-6 flex justify-center">
    <button
      onClick={handleSubmit}
      type="submit"
      className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary/80 transition"
    >
      Confirmar emoción
    </button>
  </div>
)}


    </form>
  );
}