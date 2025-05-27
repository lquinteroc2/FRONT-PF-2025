import axios from "axios";

export interface Emotion {
  id: string,
  name: string,
  emoji: string,
  clinicalValue: number,
  reflexion: string
}
export const emotionsHelper = async (token: string): Promise<Emotion[]> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${url}/emotions`;

    if (!token) {
      console.warn("⚠️ No se proporcionó token. Abortando petición.");
      throw new Error("No hay token");
    }

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Emotion[];
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Error en la respuesta del servidor:");
    } else if (error.request) {
      console.error("❌ No se recibió respuesta del servidor:");
    } else {
      console.error("❌ Error al configurar la petición:", error.message);
    }

    throw new Error("No se pudieron cargar las emociones.");
  }
};
