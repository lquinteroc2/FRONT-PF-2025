"use client"
import Link from "next/link";
import GoogleLogin from "@/components/Buttons/GoogleLogin";
console.log("GoogleLogin:", GoogleLogin);
import RelaxingVideo from "./RelaxingVideo";
console.log("RelaxingVideo:", RelaxingVideo);
import { Button } from "../ui/button";
console.log("Button:", Button);
import { motion } from 'framer-motion';
console.log("motion:", motion);

const MotionDiv = motion('div');
const LoginView = () => {
    
return (
    <>
<div className="flex flex-col md:flex-row gap-12 justify-evenly">
    <div>
        <RelaxingVideo/>
        <div className="flex flex-row items-center">

<MotionDiv className="w-full flex justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 6, ease: 'easeOut' }}>
  <h1 className="text-center lg:w-[70%] my-auto">
    Desarrolla tu <span className="text-primary-dark font-bold">EQ </span>
    (inteligencia emocional) con{" "}
    <span className="text-primary-dark font-bold text-3xl">SÉNTIA</span>
  </h1>

</MotionDiv>
</div>
    </div>
    <div className="flex flex-col lg:w-1/2 text-center ">
                  <p className="text-2xl font-semibold mb-12">
                Bienvenido a <span className="text-primary-dark font-bold">SÉNTIA</span>
            </p>
<MotionDiv        
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 6, ease: 'easeOut' }}>
        <form
            className="flex flex-col items-center"
            >
              <p className=" font-semibold mb-4">
                Iniciar Sesion
            </p>
            <div className="w-full">
        <label className="block text-lg font-medium text-neutro-dark">Correo Electronico</label>
        <input
    type="email"
    name="email"
    placeholder="Correo Electronico"
    className="w-[40%] text-center "/>
    
        </div>

            <div className="w-full">
        <label className="block text-lg font-medium text-neutro-dark">Contraseña</label>
  <input
    type="password"
    name="password"
    placeholder="Contraseña"
    className="w-[40%] text-center"
  />
        </div>
            <li className="list-none">
                <Link
                href="/terminos"
                className="block text-lg font-medium text-neutro-dark mt-2"
                >
                ¿Olvido su Contraseña?
                </Link>
            </li>
            <li className="list-none">
                <Link
                href="/register"
                className="block text-lg font-medium text-neutro-dark mt-2"
                >
                Aun no tienes cuenta. Registrate aqui.
                </Link>
            </li>
            <Button
                type="submit"
                variant="default" size="sm" className="w-[40%]"
            >
                Iniciar Sesion
            </Button>
            <GoogleLogin/>
            </form>
            </MotionDiv>
    </div>
</div>
    
    </>
)

}

export default LoginView;