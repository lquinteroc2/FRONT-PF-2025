import axios from "axios";


export const subscribeUser = async (userId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}/subscription `, {
      userId,
    });

     
    return response.data;
  } catch (error) {
    console.error("❌ Error en subscribeUser:", error);
    throw error;
  }
};

export const subscribeUserThree = async (userId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}/subscription/extended `, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error en subscribeUser:", error);
    throw error;
  }
};

export const subscribeUserPrueba = async (userId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${url}/subscription/trial `, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error en subscribeUser:", error);
    throw error;
  }
};