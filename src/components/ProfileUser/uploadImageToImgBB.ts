import axios from "axios";


const uploadImageToImgBB = async (file: File): Promise<string> => {
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Retorna la URL de la imagen subida
    return response.data.data.url;
  } catch (error) {
    console.error("Error subiendo imagen a ImgBB:", error);
    throw error;
  }
};

export default uploadImageToImgBB;


export const uploadBase64ToImgBB = async (base64Image: string): Promise<string> => {
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";

  // Quita el encabezado si existe
  const cleanedBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      { image: cleanedBase64 } // Aquí va el base64 como JSON
    );

    return response.data.data.url;
  } catch (error: any) {
    console.error("Error subiendo imagen base64 a ImgBB:", error.response?.data || error);
    throw error;
  }
};
