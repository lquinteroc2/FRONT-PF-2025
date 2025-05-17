import axios from "axios";


const googleHelper = async (userData: {
  name: string;
  email: string;
  image: string;
  sub: string;
}) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const response  = await axios.post(`${url}/auth/google`, {
      name: userData.name,
      email: userData.email,
      image: userData.image,
      sub: userData.sub, // según cómo tu backend lo espera
    });

    const { token, user } = response.data;

    // Guardar token y user en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    console.log("Login con Google exitoso. Datos guardados.");
  } catch (error: any) {
    console.error(
      "Error enviando usuario de Google al backend:",
      error.response?.data?.message || error.message
    );
  }
};

export default googleHelper;