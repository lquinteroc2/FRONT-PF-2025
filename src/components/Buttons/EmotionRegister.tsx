"use client";

import { useState } from "react";
import { useAuth } from "@/context/Auth";
import EmotionForm from "@/components/Emotion/EmotionForm";

const EmotionRegister = () => {
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
      <div className="flex justify-center my-4"> {/* my-4 adds some margin top and bottom, adjust as needed */}
        <button
          onClick={toggleModal}
          className="rounded-full bg-primary px-5 py-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-xl active:scale-95 sm:px-7 sm:py-3.5 flex items-center space-x-2 group"
        >
          <span className="transform group-hover:rotate-6 transition-transform duration-300">
            {/* Optional: Add an icon here if you have one, e.g., a smiley face */}
            {/* <svg ... /> */}
          </span>
          <span>¿Cómo te Sientes Hoy?</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-[95%] max-w-[700px] max-h-[90vh] overflow-y-auto relative flex flex-col items-center justify-center animate-scaleUp">
            <button
              onClick={toggleModal}
              aria-label="Cerrar modal"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <EmotionForm onClose={toggleModal} />
          </div>
        </div>
      )}
      {/* Add simple keyframe animations for modal transition */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0.8; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default EmotionRegister;