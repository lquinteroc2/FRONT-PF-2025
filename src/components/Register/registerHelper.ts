import axios from 'axios';
import { IUserDto } from '@/lib/types';

const registerHelper = async (userData: IUserDto) => {
    try {
        const Url = process.env.NEXT_PUBLIC_API_URL;
        console.log('API URL:', Url);
        console.log('Datos enviados al backend:', userData); // Aquí se verá confirmPassword

        const res = await axios.post(`${Url}/auth/signup`, userData);

        alert('Registrado con éxito');
        return res.data;

    } catch (error: any) {
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


