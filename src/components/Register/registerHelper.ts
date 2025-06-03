import axios from 'axios';
import { IUserDto } from '@/lib/types';

const registerHelper = async (userData: IUserDto, toast: any) => {
    try {
        const Url = process.env.NEXT_PUBLIC_API_URL;
        console.log('API URL:', Url);
        console.log('Datos enviados al backend:', userData); // Aquí se verá confirmPassword

        const res = await axios.post(`${Url}/auth/signup`, userData);
        return res.data;

    } catch (error: any) {
    console.error("Error en registerHelper:", error);
    throw error;
    }
};

export default registerHelper;


