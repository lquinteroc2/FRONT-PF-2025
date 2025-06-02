import axios from "axios";


const googleHelper = async (userData: {
  name: string;
  email: string;
  profileImage: string;
  sub: string;
}) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;

    // Renombramos aquí para que quede claro
    const payload = {
      name: userData.name,
      email: userData.email,
      profileImage: userData. profileImage, // renombrado aquí
      sub: userData.sub,
    };

    console.log("📤 Datos enviados:", payload); // ✅ ya no aparecerá como "image"

    const response = await axios.post(`${url}/auth/google`, payload);

    const { token, user } = response.data;
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Error desconocido";
    alert(` ${message} Contactate con soporte, para dar mayor informacion`);
    throw new Error(message);
  }
};

export default googleHelper;

