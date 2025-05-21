import axios from "axios";

interface SubmitEmotionData {
  userId: string;
  emotionId: string;
  intensity: number;
  comment?: string;
}

interface EmotionResponse {
  emotion: string;
  createdAt: string;
}

function isValidUUID(uuid: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
}
const emotionCreateHelper = async (data: SubmitEmotionData): Promise<EmotionResponse> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
      console.log("🧪 Verificando UUIDs:", {
  userId: data.userId,
  emotionId: data.emotionId,
});
      if (!isValidUUID(data.emotionId) || !isValidUUID(data.userId)) {
      alert("❌ El ID de usuario o emoción no tiene un formato UUID válido.");
    }

    const payload = {
      userId: data.userId,
      emotionId: data.emotionId,
      intensidad: data.intensity,
      comentario: data.comment || "",
    };

    console.log("📤 Enviando payload a /user_state", payload);

    const response = await axios.post(`${url}/user_state`, payload)  

    const emotion = response.data.emotion;
    const createdAt = response.data.createdAt;
     console.log("📤 retornando:", emotion, createdAt );
    return { emotion, createdAt };
  } catch (error: any) {
    alert(
    "❌ Error al enviar emoción:\n" +
    JSON.stringify(error.response?.data || error.message, null, 2)
  );
    throw error;
  }
};

export default emotionCreateHelper;