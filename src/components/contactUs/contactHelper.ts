import axios from 'axios';
import { motion } from 'framer-motion';

const MotionDiv = motion('div');

export const contactHelper = async (name: string, email: string) => {
  const userData = { name, email };
  try {
    const Url = process.env.NEXT_PUBLIC_API_URL;

    console.log('API URL:', Url);
    console.log('Datos enviados al backend:', userData);

    const response = await axios.post(`${Url}/contact`, userData);

    if (response.status === 201) {
      console.log('Correo nuevo registrado');
      return { success: true };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      console.error('Error en la solicitud Axios:', data);

      if (status === 409 && data?.message === 'El correo electronico ya esta registrado') {
        console.log('Correo ya registrado, continuar');
        return { success: true }; // ✅ Se considera válido
      }
    } else {
      console.error('Error desconocido:', error);
    }
  }

  return { success: false }; // ⚠️ Para errores no controlados
};