export const createResource = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error al crear recurso: ${error}`);
  }

  return await res.json();
};


export const fetchResourceById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${id}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching resource details:", error)
    throw error
  }
}