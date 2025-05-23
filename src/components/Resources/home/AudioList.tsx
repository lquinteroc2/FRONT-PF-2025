'use client'

import { Resource } from "@/lib/types";
import Card from "./Card";
import { useEffect, useState } from "react";


const cardsData = [
  {
    title: "Socializar",
    description: "Hablar con familiares, amigos o grupos de apoyo puede ayudar a compartir las preocupaciones y recibir apoyo emocional. ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960116/familia_qmtvvd.jpg",
    imageAlt: "Image 1",
    href: "/resources/card1",
  },
  
  {
    title: "terapia cognitivo conductual",
    description: "La TCC es una terapia eficaz para abordar los patrones negativos y distorsiones de pensamiento que contribuyen a la ansiedad.  ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960117/rugbi_frlosd.jpg",
    imageAlt: "Image 3",
    href: "/resources/card2",
  },
  {
    title: "Rutinas relajantes",
    description: "Dar un baño caliente, leer un libro, practicar aromaterapia o cocinar pueden crear un ambiente relajante que ayuda a reducir la ansiedad. ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/leer_kyttfv.jpg",
    imageAlt: "Image 4",
    href: "/resources/card3",
  },
];

export function AudioList() {
  const [audioResources, setAudioResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        const fetchFeaturedImages = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/resources/featured/section/audio`
          );
          const data = await response.json();
          if (Array.isArray(data)) setAudioResources(data);
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
        ...audioResources.map((resource) => ({
          title: resource.name || "Recurso destacado",
          description: resource.description || "Descripción no disponible.",
          imageSrc: resource.thumbnailUrl || "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/dormir_porkcy.jpg",
          imageAlt: resource.name || "Imagen destacada",
          href: `/resources/${resource.id}`,
        })),
      ];
  return (
    <div>
      <div className="font-geist text-3xl shadow-sm pb-2 font-bold mb-4">
        destacados por <strong className="text-primary">Séntia</strong>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl bg-gray-100 animate-pulse aspect-square" />
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {combinedCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            description={card.description}
            href={card.href}
          />
        ))}
      </div>
       )}
    </div>
  )
}
