"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { mockCarousel } from "./MockCarousel"

export default function Carousel() {

  const productos = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    nombre: `Producto ${i + 1}`,
  }));

  return (
     <div className="w-full px-4">
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={20}
        navigation
        loop={false}
      >
        {mockCarousel.map((carousel) => (
          <SwiperSlide key={carousel.id}>
            <div className="bg-white rounded-xl shadow p-2 text-center">
              <img
                src={carousel.imagen}
                alt={carousel.titulo}
                className="rounded-lg w-full h-40 object-cover"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-700">
                {carousel.titulo}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
