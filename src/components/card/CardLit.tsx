import Card from "./Card";
// import { motion } from "framer-motion";

const cardsData = [
  {
    title: "Ejercicios de respiración al aire libre",
    description: "Description for card 1",
    imageSrc: "/assets/ejercicios de respiración al aire libre.jpg",
    imageAlt: "Image 1",
    href: "/card1",
  },
  // {
  //     title: "card2",
  //     description: "Description for card 2",
  //     imageSrc: "/assets/google.webp",
  //     imageAlt: "Image 2",
  //     href: "/card2",
  // },
  {
    title: "hablar con personas",
    description: "Description for card 3",
    imageSrc: "/assets/hablar con personas.jpg",
    imageAlt: "Image 3",
    href: "/card3",
  },
  {
    title: "Joga",
    description: "Description for card 4",
    imageSrc: "/assets/Joga.jpg",
    imageAlt: "Image 4",
    href: "/card4",
  },
  {
    title: "Meditación",
    description: "Description for card 4",
    imageSrc: "/assets/meditación.jpg",
    imageAlt: "Image 5",
    href: "/card5",
  },
];

export function CardList() {
  return (
    <div>
    <div className="text-center font-geist text-3xl shadow-md pb-2 font-bold mb-4">
        Lo que más ven nuestros usuarios
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
