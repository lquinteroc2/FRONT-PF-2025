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

    console.log("📡 Enviando solicitud a:", url);
    console.log("🔐 Token:", token.slice(0, 10) + "..."); // Mostrar solo parte por seguridad

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true, // 🔁 evitar que Axios tire error por status HTTP
    });

    console.log("✅ Status HTTP:", response.status);
    console.log("🧠 Content-Type:", response.headers["content-type"]);
    console.log("📥 Datos recibidos:", response.data);

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
