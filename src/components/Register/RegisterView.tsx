"use client"

import { ErrorMessage, Field, Form, Formik } from "formik"
import { validationSchemaRegister } from "./registervalidationSchema";
import { IUserDto } from "@/lib/types";
import { Button } from "../ui/button";
import { motion } from 'framer-motion';
import registerHelper from "./registerHelper";

const MotionDiv = motion('div');

const RegisterView = () => {

    return (
<>

        <div className="flex flex-col md:flex-row gap-1 bg-secondary-50 my-20">
       
        <MotionDiv
        className="flex flex-col p-4 rounded-lg w-full md:w-1/2 items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
>
        <div className="text-6xl text-neutro-dark font-bold">Conoce tus Emociones</div>
        <div className="text-6xl text-neutro-dark font-bold my-3">con</div>
  <div>
        <span className="text-primary-dark font-bold text-7xl">SÉNTIA</span>
  </div>
</MotionDiv>

        <MotionDiv className="flex flex-col p-4 rounded-lg w-full md:w-1/2 items-center"       
  initial={{ opacity: 0, y: 100 }} // inicia fuera de pantalla abajo
  animate={{ opacity: 1, y: 0 }}   // aparece y sube
  transition={{ duration: 1.5, ease: 'easeOut' }}>
        <p className="text-2xl font-bold mb-12">Formulario de Registro</p>
<Formik<IUserDto>
  initialValues={{
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    profileImage: "",
  }}
  validationSchema={validationSchemaRegister}
onSubmit={async (values, { resetForm }) => {
  const result = await registerHelper(values); // Enviamos todo, incluyendo confirmPassword
  if (result) {
    alert('Registro exitoso');
    resetForm();
  }
}}
>  
        <Form className="flex flex-col w-full">


        <div className='text-center w-full'><label className="block text-sm font-semibold text-neutro-dark ">
        Nombre
        </label>
        <div className="mx-auto text-center w-[40%]">
        <Field
        className="w-full text-center text-sm border border-neutro-dark rounded-sm"
        type="text"
        name="name"
        placeholder="Nombre"/>
        <ErrorMessage
    name="name"
    component="div"
    className="text-sm text-primary-dark font-bold"/>
    </div> 
</div>

        <div className='text-center '><label className="block text-sm font-semibold text-neutro-dark"> 
        Correo Electronico
        </label>
        <div className="mx-auto text-center w-[40%]">
        <Field
        className="w-full text-center text-sm border border-neutro-dark rounded-sm"
        type="email"
        name="email"
        placeholder="Correo Electronico"/>
        <ErrorMessage
    name="email"
    component="div"
    className="text-sm text-primary-dark font-bold"/>
    </div> 
</div>

        <div className='text-center'><label className="block text-sm font-semibold text-neutro-dark"> 
        Contraseña 
        </label> 
                <div className="mx-auto text-center w-[40%]">
        <Field
        className="w-full text-center text-sm border border-neutro-dark rounded-sm"
        type="password"
        name="password"
        placeholder="Contraseña"/>
        <ErrorMessage
    name="password"
    component="div"
    className="text-sm text-primary-dark font-bold"/>
    </div> 
        </div>

        <div className='text-center'><label className="block text-sm font-semibold text-neutro-dark">
        Confirmar Contraseña 
        </label>
                <div className="mx-auto text-center w-[40%]">
        <Field
        className="w-full text-center text-sm border border-neutro-dark rounded-sm"
        type="password"
        name="confirmPassword"
        placeholder="Confirmar Contraseña"/>
        <ErrorMessage
    name="confirmPassword"
    component="div"
    className="text-sm text-primary-dark font-bold"/>
    </div> 
</div>

        <div className='text-center w-full'><label className="block text-sm font-semibold text-neutro-dark ">
        Direccion
        </label>
        <div className="mx-auto text-center w-[40%]">
        <Field
        className="w-full text-center text-sm border border-neutro-dark rounded-sm"
        type="text"
        name="address"
        placeholder="Direccion"/>
        <ErrorMessage
    name="address"
    component="div"
    className="text-sm text-primary-dark font-bold"/>
    </div> 
</div>

        <div className='text-center w-full'><label className="block text-sm font-semibold text-neutro-dark ">
        Foto
        </label>
        <div className="mx-auto text-center w-[40%]">
        <Field
        className="w-full text-center text-sm border border-neutro-dark rounded-sm"
        type="text"
        name="profileImage"
        placeholder="Imagen"/>
        <ErrorMessage
    name="profileImage"
    component="div"
    className="text-sm text-primary-dark font-bold"/>
    </div> 
</div>

<Button
                type="submit"
                variant="default" size="sm" className="w-[40%] font-bold mt-4 mx-auto"
            >
                Registrate
            </Button>
        
        </Form>
        </Formik>
        </MotionDiv>
        </div>
        </>

    )
}

export default RegisterView;