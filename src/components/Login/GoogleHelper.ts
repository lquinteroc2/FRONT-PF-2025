import axios from "axios";
import { toast } from "../ui/use-toast";


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


    const response = await axios.post(`${url}/auth/google`, payload);

    const { token, user } = response.data;
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Error desconocido";
    toast({
        title: "Error al loguear",
        description: ` ${message} Contactate con soporte, para dar mayor informacion`,
        variant: "destructive",
      });
    throw new Error(message);
  }
};

export default googleHelper;

