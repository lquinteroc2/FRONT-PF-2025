import axios from "axios";

interface SubscribeUserParams {
  userId: string;
  sessionId: string;
  token: string;
}

export const subscribeUser = async ({ userId, sessionId, token }: SubscribeUserParams) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.post(
      `${url}/subscription`,
      { userId, sessionId },                             // ← data
      { headers: { Authorization: `Bearer ${token}` } }  // ← config (¡coma!)
    );
    return res.data;
  } catch (err) {
    console.error("❌ Error en subscribeUser:", err);
    throw err;
  }
};

export const subscribeUserThree = async ({ userId, sessionId, token }: SubscribeUserParams) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.post(
      `${url}/subscription/extended`,
      { userId, sessionId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("❌ Error en subscribeUserThree:", err);
    throw err;
  }
};

export const subscribeUserPrueba = async ({ userId, sessionId, token }: SubscribeUserParams) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.post(
      `${url}/subscription/trial`,
      { userId, sessionId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("❌ Error en subscribeUserPrueba:", err);
    throw err;
  }
};
