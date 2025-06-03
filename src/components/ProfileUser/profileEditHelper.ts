import axios, { AxiosError } from "axios";

export interface UpdateUserData {
  name?: string;
  address?: string;
  profileImage?: string;
}

export async function profileEditHelper(
  userId: string,
  data: UpdateUserData,
  token: string
) {
  try {
    const { data: resData } = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resData;
  } catch (err) {
    const error = err as AxiosError;

    // 1️⃣ Consola detallada
    console.groupCollapsed("🚨 profileEditHelper error");
    console.error("Message:", error.message);
    if (error.config) {
      console.error("Request URL:", error.config.url);
      console.error("Method:", error.config.method);
      console.error("Headers:", error.config.headers);
      console.error("Payload:", error.config.data);
    }
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received. Raw request:", error.request);
    }
    console.groupEnd();

    // 2️⃣ Dev-friendly throw
    throw new Error(
      `profileEditHelper failed: ${
        error.response?.status
          ? `HTTP ${error.response.status}`
          : error.message
      }`
    );
  }
}



export interface AdminUpdateUserData {
  name?: string
  email?: string
  address?: string
  profileImage?: string
  role?: string 
  status: string
}

export async function adminEditUserHelper(
  userId: string,
  data: AdminUpdateUserData,
  token: string,
) {
  
  try {
    console.log("🔄 Enviando PATCH con data:", data)
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change/admin`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log("✅ Respuesta del servidor:", response.data)
    return response.data
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Error en la respuesta del servidor:", error.response.data)
    } else if (error.request) {
      console.error("❌ Error en la petición:", error.request)
    } else {
      console.error("❌ Error al configurar la petición:", error.message)
    }
    throw error
  }
}
