import axios from "axios";

export interface UpdateUserData {
  name?: string;
  address?: string;
  profileImage?: string;
}
export async function profileEditHelper(userId: string, data: UpdateUserData, token: string) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
     
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Error en la respuesta del servidor:");
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error("❌ Error al configurar la petición:");
    }
    throw error;
  }
};


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
