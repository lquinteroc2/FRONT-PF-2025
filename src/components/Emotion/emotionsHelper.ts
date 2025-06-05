import axios from "axios";

export interface EmotionAdmin {
  id: string;
  name: string;
  emoji: string;
  clinicalValue: number;
  reflexion: string;
  significado: string;
}

export const emotionsHelper = async (token: string): Promise<EmotionAdmin[]> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/emotions`;

    if (!token) {
      console.warn("⚠️ No se proporcionó token. Abortando petición.");
      throw new Error("No hay token");
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true, // 🔁 evitar que Axios tire error por status HTTP
    });


    if (response.status >= 200 && response.status < 300) {
      return response.data as EmotionAdmin[];
    } else {
      console.warn("⚠️ El servidor respondió con un status no exitoso:", response.status);
      throw new Error("Error al obtener las emociones");
    }
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Error en la respuesta del servidor:", error.response.data);
    } else if (error.request) {
      console.error("❌ No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("❌ Error al configurar la petición:", error.message);
    }

    throw new Error("No se pudieron cargar las emociones.");
  }
};

export type CreateEmotionDto = Omit<EmotionAdmin, "id">;
export const emotionsHelperAdmin = async (
  token: string,
  emotion: CreateEmotionDto
): Promise<EmotionAdmin> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/emotions`;

    if (!token) {
      console.warn("⚠️ No se proporcionó token. Abortando petición.");
      throw new Error("No hay token");
    }

    console.debug("[API] POST Emoción", emotion);

    const response = await axios.post(url, emotion, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    });

    console.debug("[API] Response status:", response.status);

    if (response.status >= 200 && response.status < 300) {
      console.debug("[API] Emoción creada con éxito:", response.data);
      return response.data as EmotionAdmin; // aquí cambio a objeto único
    } else {
      console.warn(
        "⚠️ El servidor respondió con un status no exitoso:",
        response.status
      );
      throw new Error("Error al obtener las emociones");
    }
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Error en la respuesta del servidor:", error.response.data);
    } else if (error.request) {
      console.error("❌ No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("❌ Error al configurar la petición:", error.message);
    }
    throw new Error("No se pudieron cargar las emociones.");
  }
};
