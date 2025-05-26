"use client"

import type { Resource } from "@/lib/types"
import { useEffect, useState } from "react"
import ImagesCard from "./ImagesCard"
import { motion } from "framer-motion"
import { ImageIcon } from "lucide-react"

const cardsData = [
  {
    title: "Socializar",
    description:
      "Hablar con familiares, amigos o grupos de apoyo puede ayudar a compartir las preocupaciones y recibir apoyo emocional.",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960116/familia_qmtvvd.jpg",
    imageAlt: "Image 1",
    href: "/resources/card7",
  },
  {
    title: "Terapia cognitivo conductual",
    description:
      "La TCC es una terapia eficaz para abordar los patrones negativos y distorsiones de pensamiento que contribuyen a la ansiedad.",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960117/rugbi_frlosd.jpg",
    imageAlt: "Image 3",
    href: "/resources/card8",
  },
  {
    title: "Rutinas relajantes",
    description:
      "Dar un baño caliente, leer un libro, practicar aromaterapia o cocinar pueden crear un ambiente relajante que ayuda a reducir la ansiedad.",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/leer_kyttfv.jpg",
    imageAlt: "Image 4",
    href: "/resources/card9",
  },
]

export function ImageList() {
  const [imageResources, setImageResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        const fetchFeaturedImages = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/resources/featured/section/image`
          );
          const data = await response.json();
          if (Array.isArray(data)) setImageResources(data);
        } catch (error) {
          console.error("Error fetching featured images:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchFeaturedImages();
      }, []);

      const combinedCards = [
        ...cardsData,
        ...imageResources.map((resource) => ({
          title: resource.name || "Recurso destacado",
          description: resource.description || "Descripción no disponible.",
          imageSrc: resource.thumbnailUrl || "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/dormir_porkcy.jpg",
          imageAlt: resource.name || "Imagen destacada",
          href: `/resources/${resource.id}`,
        })),
      ];

      const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }

  return (
    <div className="py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-10 w-1.5 bg-primary rounded-full" />
        <div className="font-geist text-3xl shadow-sm pb-2 font-bold mb-4 flex items-center gap-2">
          <ImageIcon className="text-primary w-8 h-8" />
          Galería de Calma <strong className="text-primary">Séntia</strong>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl bg-gray-100 animate-pulse aspect-square" />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {combinedCards.map((card, index) => (
            <ImagesCard
              key={index}
              title={card.title}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              description={card.description}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
