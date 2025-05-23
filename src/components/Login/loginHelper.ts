import { ILoginFormData } from "@/lib/types";
import axios from "axios";

export async function loginHelper(userData: ILoginFormData) {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.post(`${url}/auth/signin`, userData);

        if (res.status >= 200 && res.status < 300) {
        alert('Logueado Exitosamente');
        return res.data;
    } else {
        alert('Error del servidor');
    }
    } catch (error) {
        console.error('Error al loguear:', error);
        alert('Logueo fallido');
    }
}