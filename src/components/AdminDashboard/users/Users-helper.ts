import axios from "axios"
import { User, UserRole } from "@/lib/types"

export interface UsersResponse {
  currentPage: number
  data: User[]
  total: number
  totalPages: number
}



export interface UserRequestParams {
  page?: number;
  limit?: number;
  role?: UserRole;
  status?: 'all' | 'Activo' | 'Inactivo';
  search?: string;
}

export const usersHelper = async (token: string, params: UserRequestParams): Promise<UsersResponse> => {
  const url = process.env.NEXT_PUBLIC_API_URL
  try {
    const response = await axios.get(`${url}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
        params: params
    });


    return response.data;

  } catch (error: any) {
    // axios provee información más detallada en los errores
    console.error("Error al obtener usuarios con axios:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al conectar con la API');
  }
};


export async function updateUserHelper(
  userId: string,
  token: string,
  updates: Partial<User>
): Promise<User> {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/change/admin`;

  const payload = {
    userId,
    ...updates,
  };

  console.log(`Enviando PATCH a ${apiEndpoint} con payload:`, payload);

  try {
    const response = await axios.patch<User>(apiEndpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Usuario actualizado exitosamente:', response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      console.error(`Error en la llamada API a ${apiEndpoint}: ${message}`, error.response?.data);
      throw new Error(`La llamada API falló: ${message}`);
    } else {
      console.error('Error al intentar actualizar el usuario:', error);
      throw new Error('Ocurrió un error inesperado durante la actualización del usuario.');
    }
  }
}



export async function userStatusHelper(
  userId: string,
  newStatus: "Activo" | "Inactivo",
  token: string
) {
  const url = process.env.NEXT_PUBLIC_API_URL
  try {
    
    const response = await axios.patch(
      `${url}/users/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    return response.data
  } catch (error) {
    // Puedes afinar el manejo de errores si quieres
    throw new Error("Error al cambiar el estado del usuario")
  }
}