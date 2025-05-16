"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { mockCarousel } from "./MockCarousel"
import Image from "next/image";

export default function Carousel() {

  // const productos = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   nombre: `Carousel ${i + 1}`,
  // }));

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
                <Image
                  src={carousel.imagen}
                  alt={carousel.titulo}
                  width={800} // puedes ajustar según tu diseño
                  height={160} // 40 * 4 (tailwind rem ≈ px)
                  className="rounded-lg w-full h-40 object-cover"
                  style={{ objectFit: "cover" }}
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
