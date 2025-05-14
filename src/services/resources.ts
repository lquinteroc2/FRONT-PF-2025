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
