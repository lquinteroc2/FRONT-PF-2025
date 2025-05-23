'use client'
import Image from "next/image"
import EmotionUser from "../Buttons/EmotionRegister";

export default function Header() {

  return (
    <header className="relative h-[100vh] w-full overflow-hidden md:h-[600px]">
      <div className="relative h-full w-full">
        <Image 
        src="https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/Joga_q93kis.jpg" 
        alt="meditar al aire libre" 
        fill className="" priority />

        <div className="absolute 
        inset-0 md:inset
        
        bg-neutral-950/50"></div>
      </div>

      {/* Contenido de texto superpuesto */}
      <div className="absolute inset-0 md:inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className=" mx-auto max-w-2xl rounded-lg   bg-transparent p-6 text-center backdrop-blur- md:p-8">
            <h1 className="mb-4 text-2xl font-bold text-neutro-light sm:text-3xl md:text-4xl lg:text-5xl">
              Bienvenidos a <span className="text-primary">Séntia</span>
            </h1>
            <p className="mx-auto mb-6 max-w-xl text-sm text-neutro-light sm:text-base md:text-lg">
              Una plataforma donde puedes registrar tu estado emocional, encontrar recursos de salud mental y conectar
              con grupos de apoyo cercanos.
            </p>

         <EmotionUser />

          </div>
        </div>
      </div>

      {/* Decoración de fondo (optimizada) */}
      {/*  <div className="absolute z-10 top-[70%] blur-3xl opacity  h-screen w-screen  grid place-items-center bg-neutro-dark "></div> */}
      <div className="absolute top-1/2 bg-neutro-dark z-10 opacity-50 blur-lg h-screen w-screen">
        <div className="h-full w-full bg-neutral-700"></div>
      </div>
    </header>
  )
}
