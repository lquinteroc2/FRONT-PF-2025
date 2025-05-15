import axios from 'axios';

export const helperContact = async (name: string, email: string) => {
  const userData = {
    name: name,
    email: email,
  };
  try {
    const response = await axios.post('backend', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      return true;

    } else if (response.status === 409) {
      return true;

    } else {
      console.log('Error al enviar los datos', response.status);
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error en la solicitud Axios:', error.response?.data || error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    return false;
  }
};
