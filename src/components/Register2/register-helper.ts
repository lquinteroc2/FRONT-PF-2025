import type { IUserDto } from "@/lib/types"

export async function registerHelper(userData: IUserDto, toast:any): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error en el registro")
    }

    const result = await response.json()
    return result.success || true
  } catch (error) {

    console.error("Error en registerHelper:", error)
    toast({
      title: "Erro en el Registro",
      variant: "destructive",
    })
    throw error
  }
}
