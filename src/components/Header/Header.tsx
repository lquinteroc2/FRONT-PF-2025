import Image from "next/image"

export default function Header() {
  return (
    <header className="relative h-[100vh] w-full overflow-hidden md:h-[600px]">
      {/* Contenedor de la imagen con posición relativa */}
      <div className="relative h-full w-full">
        {/* Imagen de fondo */}
        <Image 
        // src="/assets/ejercicios de respiración al aire libre.jpg" 
        // src="/assets/hablar con personas.jpg" 
        src="/assets/joga.jpg" 
        // src="/assets/meditación.jpg" 
        alt="meditar al aire libre" 
        fill className="" priority />

        {/* para mejorar la legibilidad del texto */}
        <div className="absolute 
        inset-0 md:inset
        
        bg-neutral-950/50"></div>
      </div>

      {/* Contenido de texto superpuesto */}
      <div className="absolute inset-0 md:inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className=" mx-auto max-w-2xl rounded-lg   bg-neutral p-6 text-center backdrop-blur- md:p-8">
            <h1 className="mb-4 text-2xl font-bold text-neutro-light sm:text-3xl md:text-4xl lg:text-5xl">
              Bienvenidos a <span className="text-primary">Séntia</span>
            </h1>
            <p className="mx-auto mb-6 max-w-xl text-sm text-neutro-light sm:text-base md:text-lg">
              Una plataforma donde puedes registrar tu estado emocional, encontrar recursos de salud mental y conectar
              con grupos de apoyo cercanos.
            </p>
            <button className="rounded-full bg-primary px-4 py-2 text-white shadow-md transition-all hover:bg-primary/80 hover:shadow-lg sm:px-6 sm:py-3">
              ¿Cómo te Sientes Hoy?
            </button>
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
