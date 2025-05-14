"use client"
import React, { useState } from 'react';
import { sendContactEmails, ContactFormValues } from "@/lib/email"; // Importar la función que maneja el envío del correo

const ContactUs = () => {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene la recarga de la página

    const result = await sendContactEmails(formValues);
    if (result.success) {
      console.log('Correo enviado con éxito');
      // Aquí podrías agregar algún mensaje de éxito en la UI
    } else {
      console.log('Error al enviar el correo');
      // Aquí podrías agregar algún mensaje de error en la UI
    }
  };

  return (
             <form className="space-y-4" onSubmit={handleSubmit}> 
            <h1 className="text-center font-medium ">Contactanos</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formValues.name || ''}
            onChange={handleChange}
            placeholder="Nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formValues.email || ''}
            onChange={handleChange}
            placeholder="Correo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Asunto</label>
          <input
            type="text"
            name="subject"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formValues.subject || ''}
            onChange={handleChange}
            placeholder="Asunto"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mensaje</label>
          <textarea
            name="message"
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formValues.message || ''}
            onChange={handleChange}
            placeholder="Mensaje"
          />
        </div>

    <button type="submit">Enviar</button>

      </form>
  );
};

export default ContactUs;
