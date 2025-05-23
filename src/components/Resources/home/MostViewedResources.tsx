'use client'

import { useEffect, useState } from "react";
import Card from "./Card";
import { Resource } from "@/lib/types";

const cardsData = [
  {
    title: "Ejercicios de respiración al aire libre",
    description: "Description for card 1",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960117/ejerciciosderespiraci%C3%B3nalairelibre_fgtste.jpg",
    imageAlt: "Image 1",
    href: "/resources/card10",
  },
  {
    title: "hablar con personas",
    description: "Description for card 3",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960116/hablarconpersonas_e25pf1.jpg",
    imageAlt: "Image 3",
    href: "/resources/card11",
  },
  {
    title: "Joga",
    description: "Description for card 4",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/Joga_q93kis.jpg",
    imageAlt: "Image 4",
    href: "/resources/card12",
  },
  {
    title: "Meditación",
    description: "Description for card 4",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/meditaci%C3%B3n_yjjllb.jpg",
    imageAlt: "Image 5",
    href: "/resources/card13",
  },
];

export function MostViewedResources() {

  const [resources, setResources] = useState<Resource[]>([])
  const [shuffledCards, setShuffledCards] = useState<any[]>([])

  useEffect(() => {
  const fetchResources = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/featured`)
      const data = await response.json()

      if (Array.isArray(data)) {
        setResources(data)
      } else {
        console.error("La respuesta no es un array:", data)
        setResources([])
      }
    } catch (error) {
      console.error("Error fetching featured resources:", error)
      setResources([])
    }
  }

  fetchResources()
}, [])
   
    useEffect(() => {
    const combined = [
      ...resources.map(resource => ({
        title: resource.name,
        description: resource.description || "Recurso sin descripción",
        imageSrc: resource.thumbnailUrl || resource.cloudinaryUrl,
        imageAlt: resource.name,
        href: `/resources/${resource.id}`,
      })),
      ...cardsData,
    ]

    setShuffledCards([...combined].sort(() => Math.random() - 0.5))
   }, [resources])
   
  return (
    <div>
      <div className="text-center font-geist text-3xl shadow-md pb-2 font-bold mb-4">
        Lo que más ven nuestros usuarios
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shuffledCards.map((card, index) => (
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
    </div>
  )
}
