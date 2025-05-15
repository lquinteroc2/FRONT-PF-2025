"use client"
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { ContactFormValues, sendContactEmails } from '@/lib/email';
import { Button } from '@/components/ui/button';
import { contactValidationSchema } from './contactValidationSchema';


const initialValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactUs = () => {
  const onSubmit = async (
  values: ContactFormValues,
  { resetForm, setSubmitting }: FormikHelpers<ContactFormValues>
) => {
  const result = await sendContactEmails(values);

  if (result.success) {
    console.log('Correo enviado con éxito');
    resetForm();
  } else {
    console.log('Error al enviar el correo');
  }

  setSubmitting(false);
};


  return (
        <Formik
      initialValues={initialValues}
      validationSchema={contactValidationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="space-y-4 my-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex flex-col p-4 w-full md:w-1/2 items-center">
              <div className="lg:w-[70%] my-auto">
                <h1 className="text-center text-4xl font-bold text-neutro-dark mb-6">Contáctanos</h1>
                <p className="text-center text-3xl text-neutro-dark mb-6">
                  <strong>
                    ¿Quieres ser parte del equipo de <span className="text-primary-dark font-bold">SÉNTIA</span>?
                  </strong>
                  <br />
                  O si lo que deseas es escribir un mensaje a nuestro equipo directivo, utiliza este formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:w-1/2 text-center">
              <div className="block text-xl font-bold my-8 text-neutro-dark">Formulario de Contacto</div>

              <div>
                <label className="block text-lg font-medium text-neutro-dark">Nombre</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="w-[50%] p-2 border border-neutro-light rounded-md focus:outline-none focus:ring-2 focus:ring-secundary"
                  
                />
                <ErrorMessage name="name" component="div" className="text-sm text-primary-dark font-bold" />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutro-dark">Correo electrónico</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo"
                  className="w-[50%] p-2 border border-neutro-light rounded-md focus:outline-none focus:ring-2 focus:ring-secundary"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-primary-dark font-bold" />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutro-dark">Asunto</label>
                <Field
                  type="text"
                  name="subject"
                  placeholder="Asunto"
                  className="w-[60%] p-2 border border-neutro-light rounded-md focus:outline-none focus:ring-2 focus:ring-secundary"
                />
                 <ErrorMessage name="subject" component="div" className="text-sm text-primary-dark font-bold" />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutro-dark">Mensaje</label>
                <Field
                  as="textarea"
                  name="message"
                  rows={5}
                  placeholder="Mensaje"
                  className="w-[80%] p-2 border border-neutro-light rounded-md focus:outline-none focus:ring-2 focus:ring-secundary"
                />
                <ErrorMessage name="message" component="div" className="text-sm text-primary-dark font-bold" />
              </div>

              <div className="flex justify-center items-center w-full">
                <Button type="submit" 
                variant="default" size="sm" className="w-[40%]">

                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUs;
