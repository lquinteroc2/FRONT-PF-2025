
import emailjs from 'emailjs-com';

export interface ContactFormValues extends Record<string, string> {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmails = async (formValues: ContactFormValues) => {
   try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string; 
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string; 
    const templateIdClient = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT_ID as string; 
    const templateIdAdmin = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN_ID as string; 

    // Enviar correo al cliente
    const responseClient = await emailjs.send(serviceId, templateIdClient, formValues, userId);

    // Enviar correo a ti (el dueño del sitio)
    const responseAdmin = await emailjs.send(serviceId, templateIdAdmin, formValues, userId);

    console.log('Correo enviado:', responseClient, responseAdmin); 
    
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correos:', error); 
    return { success: false };
  }
};