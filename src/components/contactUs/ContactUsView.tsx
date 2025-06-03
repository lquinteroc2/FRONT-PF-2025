"use client"
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { ContactFormValues, sendContactEmails } from '@/lib/email';
import { Button } from '@/components/ui/button';
import { contactValidationSchema } from './contactValidationSchema';
import { contactHelper } from '@/components/contactUs/contactHelper';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { AnimatedArrow } from '../Emotion/EmotionalLogView';

const MotionDiv = motion('div');

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactUs = () => {
  const { toast } = useToast(); // ✅ mover aquí

  const onSubmit = async (
    values: ContactFormValues,
    { resetForm, setSubmitting }: FormikHelpers<ContactFormValues>
  ) => {
    console.log('Datos del formulario:', values);

    const emailResult = await sendContactEmails(values);
    const contactResult = await contactHelper(values.name, values.email);4

     if (emailResult.success) {
     toast({
    title: 'Formulario recibido',
    description: contactResult.success
      ? '¡Gracias por escribirnos! Tu mensaje ha sido enviado y pronto nos pondremos en contacto contigo.'
      : ' Gracias por volver a escribirnos; responderemos tu mensaje a la brevedad.',
  });
  resetForm();
    } else {
      console.error('Error al enviar el correo');
    }

    setSubmitting(false);
  };

  return (
        <>
  {/* Hero de contacto */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: true }}
    className="w-full max-w-6xl mx-auto text-center my-56 px-4"
  >
    <motion.h1
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight drop-shadow-[0_0_15px_rgba(109,40,217,0.4)]"
    >
      📩 Contáctanos
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
    >
      <span className="text-center text-3xl text-neutro-dark mb-6 block">
        <strong>
          ¿Quieres ser parte del equipo de{" "}
          <span className="text-primary-dark font-bold">SÉNTIA</span>?
        </strong>
        <br />
        O si deseas escribir un mensaje a nuestro equipo directivo, utiliza este formulario
        y nos pondremos en contacto contigo lo antes posible.
      </span>
    </motion.p>

    <AnimatedArrow/>
  </motion.div>

  {/* Formulario de contacto */}
  <div id="emotion-list" className="w-full max-w-5xl mx-auto px-4">
    <Formik
      initialValues={initialValues}
      validationSchema={contactValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="text-xl font-bold my-8 text-neutro-dark">
              Formulario de Contacto
            </div>

            {/* Nombre */}
            <div className="mb-4 w-full md:w-2/3">
              <label className="block text-lg font-medium text-neutro-dark">Nombre</label>
              <Field
                type="text"
                name="name"
                placeholder="Nombre"
                className="w-full p-2 border border-neutro-light rounded-md focus:outline-none focus:ring-2 focus:ring-secundary"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-primary-dark font-bold"
              />
            </div>

            {/* Email */}
            <div className="mb-4 w-full md:w-2/3">
              <label className="block text-lg font-medium text-neutro-dark">
                Correo electrónico
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Correo"
                className="w-full p-2 border border-neutro-light rounded-md focus:outline-none focus:ring-2 focus:ring-secundary"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-primary-dark font-bold"
              />
            </div>

            {/* Asunto */}
            <div className="mb-4 w-full md:w-2/3">
              <label className="block text-lg font-medium text-neutro-dark">Asunto</label>
              <Field
                type="text"
                name="subject"
                placeholder="Asunto"
                className="w-full p-2 border border-neutro-light rounded-md focus:outline-none focus:ring-2 focus:ring-secundary"
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="text-sm text-primary-dark font-bold"
              />
            </div>

            {/* Mensaje */}
            <div className="mb-4 w-full md:w-2/3">
              <label className="block text-lg font-medium text-neutro-dark">Mensaje</label>
              <Field
                as="textarea"
                name="message"
                rows={4}
                placeholder="Mensaje"
                className="w-full p-2 border border-neutro-light rounded-md focus:outline-none focus:ring-2 focus:ring-secundary"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-sm text-primary-dark font-bold"
              />
            </div>

            {/* Botón */}
            <div className="flex justify-center items-center w-full mb-4">
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="w-1/3"
                disabled={!(isValid && dirty)}
              >
                Enviar
              </Button>
            </div>
          </motion.div>
        </Form>
      )}
    </Formik>
  </div>
</>

  );
};

export default ContactUs;
