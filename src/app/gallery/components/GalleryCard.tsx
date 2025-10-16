"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PaintingCardProps } from "@/types/galleryTypes.type";

export function GalleryCard({ painting, index, variants }: PaintingCardProps) {
  const isPriority = index < 5;

  return (
    <motion.a
      key={painting.id}
      href={painting.imagePainting}
      initial="initial"
      whileHover="hover"
      data-sub-html={`
        <div class="custom-caption">
          <h4>${painting.namePainting}</h4>
          <p><strong>Data:</strong> ${painting.datePainting}</p>
        </div>
      `}
      aria-label={`Ampliar ${painting.namePainting}`}
      className="group relative mb-3 block w-full overflow-hidden rounded-lg bg-foreground sm:mb-5"
      style={{ aspectRatio: painting.width / painting.height }}
    >
      <motion.figure variants={variants.hover} className="m-0">
        <Image
          src={painting.imagePainting}
          alt={painting.alt}
          width={painting.width}
          height={painting.height}
          placeholder="blur"
          blurDataURL="/assets/placeholder.jpg"
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full rounded-lg object-cover transition-transform duration-300 ease-in-out"
        />
        <motion.figcaption
          aria-hidden="true"
          variants={variants.overlay}
          className="absolute inset-0 flex items-center justify-center bg-black/50"
        >
          <motion.span
            variants={variants.title}
            className="px-4 text-center text-lg font-semibold text-zinc-50"
          >
            {painting.namePainting}
          </motion.span>
        </motion.figcaption>
      </motion.figure>
    </motion.a>
  );
}