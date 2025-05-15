import * as Yup from 'yup';

export const contactValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'El nombre es muy corto')
    .max(50, 'El nombre es muy largo')
    .required('El nombre es obligatorio'),

  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),

  subject: Yup.string()
    .min(3, 'El asunto es muy corto')
    .max(100, 'El asunto es muy largo')
    .required('El asunto es obligatorio'),

  message: Yup.string()
    .min(10, 'El mensaje es muy corto')
    .max(1000, 'El mensaje es muy largo')
    .required('El mensaje es obligatorio'),
});
