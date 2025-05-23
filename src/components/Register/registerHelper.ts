import { IUserDto } from '@/lib/types';
import axios from 'axios';




const registerHelper = async (userData: IUserDto) => {
    try {
        const Url = process.env.NEXT_PUBLIC_API_URL;
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
           console.log('Datos enviados al backend:', userData);
        const res = await axios.post(`${Url}/auth/signup`, userData);
    
        alert('Registrado con Exito');
        return res.data;

    }  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
  console.error('Error al Registrar:', error);

  if (error.response) {
    console.error('Detalles del error:', error.response.data);
    alert(error.response.data.message || 'No se pudo registrar');
  } else {
    alert('No se pudo registrar');
  }
}
    
};

export default registerHelper;