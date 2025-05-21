import axios from "axios";

export interface Emotion {
  id: string,
  name: string,
  emoji: string,
  clinicalValue: number,
  reflexion: string
}
export const emotionsHelper = async (): Promise<Emotion[]> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${url}/emotions`);
    return response.data as Emotion[];
  } catch (error: any) {
    console.error("❌ Error al obtener emociones:", error.response?.data || error.message);
    throw new Error("No se pudieron cargar las emociones.");
  }
};