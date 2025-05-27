import axios from "axios";

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export async function changePasswordHelper(
  data: ChangePasswordData,
  token: string
): Promise<void> {
  try {
    await axios.patch(
      "${process.env.NEXT_PUBLIC_API_URL}/users/update/password", // Cambia esta URL por la de tu API real
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Error al cambiar la contraseña";
    throw new Error(message);
  }
}
