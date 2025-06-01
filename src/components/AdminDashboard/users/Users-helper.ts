import imageCompression from 'browser-image-compression';
import uploadImageToImgBB from "@/components/ProfileUser/uploadImageToImgBB"
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
      { id: userId, status: newStatus }, // <- Aquí agregas el id
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error("Error al cambiar el estado del usuario")
  }
}




export async function createAdminHelper(adminData: Partial<User>, token: string, file: File) {
  const url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const formData = new FormData();

    // Eliminar profileImage si existe, para no enviarlo como string
    const dataToSend = { ...adminData };
    delete dataToSend.profileImage;

    // Agregas los datos de adminData (sin profileImage)
    Object.entries(dataToSend).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Agregas el archivo con el nombre que espera el backend, por ejemplo 'profileImage'
    formData.append('profileImage', file);

    const response = await axios.post(`${url}/users/admin-create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ Detalles del error al crear usuario admin:", error?.response?.data || error.message);
    throw new Error("Error al crear el usuario admin");
  }
}



export async function compressAndUploadImage(file: File): Promise<string> {
  try {
    const options = {
      maxSizeMB: 1,          // tamaño máximo en MB (ejemplo: 1MB)
      maxWidthOrHeight: 1024, // ancho o alto máximo en px
      useWebWorker: true,
    };

    // Comprime la imagen
    const compressedFile = await imageCompression(file, options);

    // Ahora subimos la imagen comprimida, por ejemplo a ImgBB o tu backend
    const imageUrl = await uploadImageToImgBB(compressedFile); // tu función para subir imágenes

    return imageUrl;
  } catch (error) {
    console.error('Error comprimiendo la imagen:', error);
    throw error;
  }
}