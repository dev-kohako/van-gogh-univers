"use client";

import Image from "next/image";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { PaintingCarouselProps } from "@/types/homePage.type";

export function PaintingCarousel({ paintings }: PaintingCarouselProps) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      loop
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      speed={1200}
      slidesPerView={2}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[EffectCoverflow, Autoplay]}
      className="w-[90vw] max-w-7xl my-5 mask-x-from-90% mask-x-to-97% z-40 overflow-visible"
    >
      {paintings.map((painting, i) => (
        <SwiperSlide
          key={uuidv4()}
          className="flex justify-center items-center"
        >
          <Image
            src={painting.src}
            alt={painting.alt ?? `Obra de arte ${i + 1}`}
            width={400}
            height={300}
            sizes=""
            className="w-full h-40 sm:h-52 md:h-64 lg:h-80 xl:h-96 object-cover rounded-lg"
            priority={i < 2}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
