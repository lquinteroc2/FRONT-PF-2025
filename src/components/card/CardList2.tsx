import Card from "./Card";
// import { motion } from "framer-motion";

const cardsData = [
  {
    title: "Socializar",
    description: "Hablar con familiares, amigos o grupos de apoyo puede ayudar a compartir las preocupaciones y recibir apoyo emocional. ",
    imageSrc: "/assets/familia.jpg",
    imageAlt: "Image 1",
    href: "/card1",
  },
  
  {
    title: "terapia cognitivo conductual",
    description: "La TCC es una terapia eficaz para abordar los patrones negativos y distorsiones de pensamiento que contribuyen a la ansiedad.  ",
    imageSrc: "/assets/rugbi.jpg",
    imageAlt: "Image 3",
    href: "/card3",
  },
  {
    title: "Ritinas relajantes",
    description: "Dar un baño caliente, leer un libro, practicar aromaterapia o cocinar pueden crear un ambiente relajante que ayuda a reducir la ansiedad. ",
    imageSrc: "/assets/leer.jpg",
    imageAlt: "Image 4",
    href: "/card4",
  },
  {
    title: "Dormir bien",
    description: "Un sueño adecuado es importante para el bienestar general y puede ayudar a reducir la ansiedad. ",
    imageSrc: "/assets/dormir.jpg",
    imageAlt: "Image 5",
    href: "/card5",
  },
];

export function CardList2() {
  return (
    <div>
    <div className=" font-geist text-3xl shadow-sm pb-2 font-bold mb-4">
        destacados por <strong className="text-primary">Séntia</strong>
    </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardsData.map((card, index) => (
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
  );
}
