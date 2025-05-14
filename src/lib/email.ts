
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

    await emailjs.send(serviceId, templateIdClient, formValues, userId);

    await emailjs.send(serviceId, templateIdAdmin, formValues, userId);
    
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correos:', error); 
    return { success: false };
  }
};