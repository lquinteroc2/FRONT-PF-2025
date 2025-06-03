"use client"

import Link from "next/link";
import GoogleLogin from "@/components/Buttons/GoogleLogin";
import RelaxingVideo from "@/components/Login/RelaxingVideo";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ILoginFormData } from "@/lib/types";
import { loginValidationSchema } from "./loginvalidationSchema";
import { loginHelper } from "./loginHelper";
import { useAuth } from "@/context/Auth";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";

const initialValues: ILoginFormData = {
  email: '',
  password: '',
};

const MotionDiv = motion('div');


const LoginView = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (
    values: { email: string; password: string },
    { resetForm, setSubmitting }: FormikHelpers<{ email: string; password: string }>
  ) => {
    const result = await loginHelper(values);

    if (result.success) {
      const { token, user } = result.data;
      setUser({ token, user });

      toast({
        title: "¡Bienvenido!",
        description: "Logueado exitosamente.",
      });

      setTimeout(() => {
        router.push("/home");
      }, 3000);
      resetForm();
      setSubmitting(false);

    } else {
      toast({
        title: "Error al loguear",
        description: result.error || "Intenta nuevamente",
        variant: "destructive",
      });

      setSubmitting(false);
    }
  };

return (
    <>
<div className="flex flex-col md:flex-row gap-12 justify-evenly mt-20">
    <div>
        <RelaxingVideo/>
        <div className="flex flex-row items-center mt-8">

<MotionDiv className="w-full flex justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 6, ease: 'easeOut' }}>
  <h1 className="text-center text-2xl font-semibold lg:w-[70%] my-auto">
    Desarrolla tu <span className="text-primary-dark text-2xl font-bold">EQ </span>
    (inteligencia emocional) con{" "}
    <span className="text-primary-dark font-bold text-4xl">SÉNTIA</span>
  </h1>

</MotionDiv>
</div>
    </div>
    <div className="flex flex-col lg:w-1/2 text-center ">
                  <p className="text-2xl font-bold mb-12">
                Bienvenido a <span className="text-primary-dark font-bold">SÉNTIA</span>
            </p>
<MotionDiv        
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 3, ease: 'easeOut' }}>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginValidationSchema}
      >
        <Form
            className="flex flex-col items-center"
            >
              <p className=" font-bold text-lg mb-4">
                INICIAR SESION
            </p>
            <div className="w-full">
        <label className="block text-sm font-semibold  text-neutro-dark">Correo Electronico</label>
        <Field
    type="email"
    name="email"
    placeholder="Correo Electronico"
    className="w-[60%] text-center border border-neutro-dark rounded"/>
    <ErrorMessage name="email" component="div" className="text-sm text-primary-dark font-bold" />
        </div>

            <div className="w-full">
        <label className="block text-sm font-semibold text-neutro-dark">Contraseña</label>
  <Field
    type="password"
    name="password"
    placeholder="Contraseña"
    className="w-[60%] text-center border border-neutro-dark rounded"
  />
  <ErrorMessage name="password" component="div" className="text-sm text-primary-dark font-bold" />
        </div>
            <li className="list-none">
                <Link
                href="/olvido-contrasena"
                className="block text-sm font-medium text-neutro-dark mt-2"
                >
                ¿Olvido su Contraseña?
                </Link>
            </li>
            <li className="list-none">
                <Link
                href="/register"
                className="block text-sm font-medium text-neutro-dark mt-2"
                >
                ¿Aun no tienes cuenta?. Registrate aqui.
                </Link>
            </li>
            <Button
                type="submit"
                variant="default" size="sm" className="w-[60%] font-bold mt-4"
            >
                Iniciar Sesion
            </Button>
            <div className="mb-4">
                <h1 className="block text-sm font-medium text-primary-dark mt-4"> o Inicia Sesion con:</h1>
            </div>
            <GoogleLogin/>
            </Form>
            </Formik>
            </MotionDiv>
    </div>
</div>
</>
)

}

export default LoginView;