import axios from "axios"
import { User } from "@/lib/types"

export const usersHelper = async (token: string): Promise<User[]> => {
  const url = process.env.NEXT_PUBLIC_API_URL

  try {
    const response = await axios.get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error al obtener usuarios")
  }
}