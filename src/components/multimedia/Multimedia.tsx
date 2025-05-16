"use client"

import { motion } from "framer-motion"
import YouTubePlayer from "./youtubePlayer"
import { ArrowUpRightFromSquare } from "lucide-react"

export default function Multimedia() {
  return (
    <section className="relative border-y-2  overflow-hidden  py-20 md:py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0  opacity-30">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-teal-200 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl text-justify font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span className="block ">Te lo dice  </span>
                <span className="block text-primary">Séntia</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-md text-lg text-gray-600 font-[100] md:max-w-lg"
            >
             Los expertos indican que caminar al aire libre ofrece múltiples beneficios para la salud, tanto físicos como mentales. Estos beneficios incluyen mejorar la salud cardiovascular, fortalecer el sistema inmunológico, reducir el estrés, mejorar el estado de ánimo y potenciar la salud cognitiva. Además, caminar al aire libre puede ayudar a reducir el riesgo de miopía y mejorar la atención y la memoria. 
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <span  className=" flex cursor-pointer text-secondary font-bold hover:text-secondary-dark">
              <ArrowUpRightFromSquare/>
                Comenzar ahora 
              </span>
              
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative mx-auto overflow-hidden  h-[400px] w-full max-w-md rounded-2xl md:w-[401px]  md:h-[510px]"
          >
            <YouTubePlayer videoId="LzD7Fw18lQI"  />

            {/* <iframe

                                className="absolute z-10 md:h-[400px] "


                width="100%"
                height="315"
                src="https://www.youtube.com/shorts/LzD7Fw18lQI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe> */}
              {/* <video src="/videos/relax.mp4"  
                autoPlay
                muted
                loop
                playsInline
                
                className="absolute z-10 md:h-[400px]  rounded-lg"></video> */}

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
            </div>
      </div>
    </section>
  )
}
