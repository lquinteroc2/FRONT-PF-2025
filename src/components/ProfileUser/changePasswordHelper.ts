import axios from "axios";

export interface ChangePasswordData {
  currentPassword: string;
  password: string;   
  confirmPassword: string;   
}

export async function changePasswordHelper(
  data: ChangePasswordData,
  token: string
): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/update/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      // Intentamos obtener el mensaje de error del body
      let errorMessage = "Error al cambiar la contraseña";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // No JSON, dejamos el mensaje por defecto
      }
      throw new Error(errorMessage);
    }
  } catch (error: any) {
    // Error en la petición fetch o error lanzado arriba
    throw new Error(error.message || "Error al cambiar la contraseña");
  }
}
