
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
  } catch (error) {
    console.error("❌ Error al actualizar el usuario:", error);
    throw error;
  }
};


