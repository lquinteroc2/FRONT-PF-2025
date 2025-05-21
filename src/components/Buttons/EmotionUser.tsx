"use client";

import { useState } from "react";
import EmotionSelectorForm from "@/components/Emotion/EmotionForm";
import { useAuth } from "@/context/Auth";

const EmotionUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleModal = () => {
    if (!user) {
      alert("Debes iniciar sesión para poder registrar emociones.");
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="rounded-full bg-primary px-4 py-2 text-white shadow-md transition-all hover:bg-primary/80 hover:shadow-lg sm:px-6 sm:py-3"
      >
        ¿Cómo te Sientes Hoy?
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-[700px] max-h-[80vh] overflow-y-auto relative flex flex-col items-center justify-center">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>

            <EmotionSelectorForm onClose={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default EmotionUser;
