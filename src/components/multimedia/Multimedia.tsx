"use client"

import { motion } from "framer-motion"
import { ArrowUpRightFromSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { Resource } from "@/lib/types"
import YouTubePlayer from "./youtubePlayer"

export default function Multimedia() {
  const [videoResource, setVideoResource] = useState<Resource | null>(null)

useEffect(() => {
  const fetchFeaturedVideo = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/main-video`);
      const data = await response.json();
      if (data) setVideoResource(data);
    } catch (error) {
      console.error("Error fetching featured video resource:", error);
    }
  };

  fetchFeaturedVideo();
}, []);
  
  const title = videoResource?.name || "Te lo dice Séntia"
  const description =
    videoResource?.description ||
    "Los expertos indican que caminar al aire libre ofrece múltiples beneficios para la salud..."

  return (
    <section className="relative border-y-2 overflow-hidden py-20 md:py-16">
      <div className="absolute inset-0 z-0 opacity-30">
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
                {title.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-md text-lg text-gray-600 font-[100] md:max-w-lg"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <span className="flex cursor-pointer text-secondary font-bold hover:text-secondary-dark">
                <ArrowUpRightFromSquare />
                Comenzar ahora
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative mx-auto overflow-hidden h-[400px] w-full max-w-md rounded-2xl md:w-[401px] md:h-[510px]"
          >
            {videoResource?.cloudinaryUrl ? (
            <video
              src={videoResource.cloudinaryUrl}
              autoPlay
              muted
              playsInline
              loop
              className="h-full w-full object-cover rounded-2xl"
              preload="metadata"
            />
            ) : (
            <YouTubePlayer
                videoId="LzD7Fw18lQI" // Aquí el ID del video de fallback
                autoPlay={true}
                muted={true}
                loop={true}
                className="h-full w-full rounded-2xl"
                width="100%"
                height="100%"
              />
            )}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
