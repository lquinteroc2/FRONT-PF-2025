"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import axios from "axios";

// INTERFAZ de emociones registradas
export interface RegisteredEmotion {
  id: string;
  emotion: {
    id: string;
    name: string;
    emoji: string;
    reflexion: string;
    clinicalValue: number;
  };
  intensity: number;
  comment: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// HELPER embebido
const getUserIdHelper = async (userId: string): Promise<RegisteredEmotion[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);

    console.log("📦 Respuesta completa del backend:", response.data);

    const rawStates = response.data.states;

    const formattedStates: RegisteredEmotion[] = rawStates.map((state: any) => ({
      id: state.id,
      emotion: {
        id: state.emotion.id,
        name: state.emotion.name,
        emoji: state.emotion.emoji,
        reflexion: state.emotion.reflexion, // o 'significado' si se llama así
        clinicalValue: state.emotion.clinicalValue,
      },
      intensity: state.intensidad,
      comment: state.comentario,
      date: state.date,
      createdAt: state.createdAt,
      updatedAt: state.updatedAt,
    }));

    console.log("📘 Emociones formateadas:", formattedStates);

    return formattedStates;
  } catch (error) {
    console.error("❌ Error al obtener las emociones del usuario:", error);
    throw error;
  }
};


// COMPONENTE
export default function GetUserId() {
  const [emotions, setEmotions] = useState<RegisteredEmotion[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.user.id) {
      getUserIdHelper(user.user.id)
        .then(setEmotions)
        .catch(console.error);
    }
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Historial de emociones</h2>
      <ul className="space-y-4">
        {emotions.map((e) => (
          <li key={e.id} className="p-4 border rounded shadow-sm">
            <p><strong>{e.emotion.name}</strong> {e.emotion.emoji}</p>
            <p>Intensidad: {e.intensity}</p>
            <p>Comentario: {e.comment || "Sin comentario"}</p>
            <p className="text-sm text-gray-500">
              Registrado el {new Date(e.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
