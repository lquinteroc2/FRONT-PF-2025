import axios from "axios";

interface SubscribeUserParams {
  userId: string;
  sessionId: string;
}

export const subscribeUser = async ({ userId, sessionId }: SubscribeUserParams) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}/subscription`, { userId, sessionId });
    return response.data;
  } catch (error) {
    console.error("❌ Error en subscribeUser:", error);
    throw error;
  }
};

export const subscribeUserThree = async ({ userId, sessionId }: SubscribeUserParams) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}/subscription/extended`, { userId, sessionId });
    return response.data;
  } catch (error) {
    console.error("❌ Error en subscribeUserThree:", error);
    throw error;
  }
};

export const subscribeUserPrueba = async ({ userId, sessionId }: SubscribeUserParams) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}/subscription/trial`, { userId, sessionId });
    return response.data;
  } catch (error) {
    console.error("❌ Error en subscribeUserPrueba:", error);
    throw error;
  }
};
