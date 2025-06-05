"use client"

import { ErrorMessage, Field, Form, Formik } from "formik"
import { validationSchemaRegister } from "./registervalidationSchema";
import { IUserDto } from "@/lib/types";
import { Button } from "../ui/button";
import { motion } from 'framer-motion';
import registerHelper from "./registerHelper";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const MotionDiv = motion('div');
interface MyExpectedError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string; 
}

const RegisterView = () => {
    const { toast } = useToast();
    const router = useRouter()
    return (
        <div className="flex flex-col md:flex-row gap-1 bg-secondary-50">
            <MotionDiv
                className="flex flex-col p-4 rounded-lg w-full md:w-1/2 items-center justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: 'easeOut' }}
            >
                <div className="text-6xl text-neutro-dark font-bold">Conoce tus Emociones</div>
                <div className="text-6xl text-neutro-dark font-bold my-3">con</div>
                <MotionDiv
                    className="text-primary-dark font-bold text-7xl"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3.5, ease: 'easeOut' }}>
                    <span>SÉNTIA</span>
                </MotionDiv>
            </MotionDiv>

            <MotionDiv className="flex flex-col p-4 rounded-lg w-full md:w-1/2 items-center"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}>
                        <div className="w-full max-w-md space-y-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutro-dark">Formulario de Registro</h2>
            <p className="mt-2 text-sm text-gray-600">Únete a Séntia y comienza tu viaje emocional</p>
          </div>
          </div>

                <Formik<IUserDto>
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={validationSchemaRegister}
                    onSubmit={async (values, { resetForm }) => {
  try {
    
    const result = await registerHelper(values, toast); 

    console.log("Resultado del registro (success):", result);

    
    if (result) { 
      toast({
        title: "Registro exitoso",
        description: "¡Bienvenido a Séntia!",
      });
      resetForm();
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
    

  } catch (err) {
  console.error("❌ Error durante el registro:", err); 

  const error = err as MyExpectedError; 


  const errorMessage = error?.response?.data?.message || error?.message || ""; 

  if (
    errorMessage.includes("El correo está registrado mediante Google") ||
    errorMessage.includes("El correo ya está registrado manualmente")
  ) {

    toast({
      title: "Correo ya registrado",
      description: "Este correo electrónico ya está en uso. Por favor, intenta iniciar sesión o utiliza otro correo.",
      variant: "destructive", 
    });
  } else {

    toast({
      title: "Error de Registro",
      description: errorMessage || "No se pudo completar el registro. Por favor, inténtalo de nuevo.",
      variant: "destructive",
    });
  }
}
}}
                >
                    <Form className="flex flex-col w-full">
                        {/* Campo: Nombre */}
                        <div className='text-center w-full'>
                            <label className="block text-sm font-semibold text-neutro-dark ">Nombre</label>
                            <div className="mx-auto text-center w-[40%]">
                                <Field className="w-full text-center text-sm border border-neutro-dark rounded-sm" type="text" name="name" placeholder="Nombre" maxLength={20} />
                                <ErrorMessage name="name" component="div" className="text-sm text-primary-dark font-bold" />
                            </div>
                        </div>

                        {/* Campo: Email */}
                        <div className='text-center'>
                            <label className="block text-sm font-semibold text-neutro-dark">Correo Electrónico</label>
                            <div className="mx-auto text-center w-[40%]">
                                <Field className="w-full text-center text-sm border border-neutro-dark rounded-sm" type="email" name="email" placeholder="Correo Electrónico" maxLength={40} />
                                <ErrorMessage name="email" component="div" className="text-sm text-primary-dark font-bold" />
                            </div>
                        </div>

                        {/* Campo: Contraseña */}
                        <div className='text-center'>
                            <label className="block text-sm font-semibold text-neutro-dark">Contraseña</label>
                            <div className="mx-auto text-center w-[40%]">
                                <Field className="w-full text-center text-sm border border-neutro-dark rounded-sm" type="password" name="password" placeholder="Contraseña" maxLength={30}/>
                                <ErrorMessage name="password" component="div" className="text-sm text-primary-dark font-bold" />
                            </div>
                        </div>

                        {/* Campo: Confirmar Contraseña */}
                        <div className='text-center'>
                            <label className="block text-sm font-semibold text-neutro-dark">Confirmar Contraseña</label>
                            <div className="mx-auto text-center w-[40%]">
                                <Field className="w-full text-center text-sm border border-neutro-dark rounded-sm" type="password" name="confirmPassword" placeholder="Confirmar Contraseña" maxLength={30} />
                                <ErrorMessage name="confirmPassword" component="div" className="text-sm text-primary-dark font-bold" />
                            </div>
                        </div>

                        <Button type="submit" variant="default" size="sm" className="w-[40%] font-bold mt-4 mx-auto">
                            Regístrate
                        </Button>

                    </Form>
                </Formik>
            </MotionDiv>
        </div>
    );
};

export default RegisterView;
