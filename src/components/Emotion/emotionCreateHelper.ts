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

const emotionCreateHelper = async (
  data: SubmitEmotionData,
  token: string
): Promise<EmotionResponse> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;

    if (!isValidUUID(data.emotionId) || !isValidUUID(data.userId)) {
      throw new Error("UUID inválido");
    }
    const payload = {
      userId: data.userId,
      emotionId: data.emotionId,
      intensidad: data.intensity,
      comentario: data.comment || "",
    };

    const response = await axios.post(`${url}/user_state`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { emotion, createdAt } = response.data

    return { emotion, createdAt };
  } catch (error: any) {
    throw error;
  }
};

export default emotionCreateHelper;
