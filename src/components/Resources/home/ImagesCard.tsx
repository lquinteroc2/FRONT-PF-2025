"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface CardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export default function ImagesCard({ title, description, imageSrc, imageAlt }: CardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={item}>
        <div className="group relative overflow-hidden rounded-xl h-72 w-64 md:h-72 cursor-pointer">
          {/* Imagen */}
          <div className="relative h-full w-full">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Overlay con información (aparece al hacer hover) */}
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
              {title}
            </h3>
            <p className="text-white/90 text-sm transform translate-y-4 transition-transform duration-300 delay-75 group-hover:translate-y-0 line-clamp-3">
              {description}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
          </div>
        </div>
    </motion.div>
  )
}
