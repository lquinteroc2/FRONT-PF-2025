import axios from "axios";

interface UpdateUserData {
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