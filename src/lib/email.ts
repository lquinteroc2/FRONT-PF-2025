
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

export interface ContactFormValues extends Record<string, string> {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmails = async (
  formValues: ContactFormValues
): Promise<{ success: boolean }> => {
  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string;
    const templateIdClient = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT_ID as string;
    const templateIdAdmin = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN_ID as string;

    const templateParams = {
      name: formValues.name,
      email: formValues.email,
      subject: formValues.subject,
      message: formValues.message,
    };



    await emailjs.send(serviceId, templateIdClient, templateParams, userId);
    await emailjs.send(serviceId, templateIdAdmin, templateParams, userId);

    return { success: true };
  } catch (error: any) {
    if (error?.status && error?.text) {
      console.error('EmailJS error status:', error.status, error.text);
    } else {
      console.error('Error al enviar correos:', error);
    }
    return { success: false };
  }
};
