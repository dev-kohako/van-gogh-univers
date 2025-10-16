"use client";

import { memo } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Painting } from "@/types/types";

import { Button } from "@/components/ui/button";

const MotionImage = motion.create(Image);

export const PaintingCard = memo(function PaintingCard({
  photo,
  isActive,
  onCardClick,
  index,
}: {
  photo: Painting;
  isActive: boolean;
  onCardClick: (id: string) => void;
  index: number;
}) {
  const imageVariants = {
    initial: { y: 0, scale: 1.015 },
    hover: {
      y: 30,
      scale: 1.25,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  } as const;

  const overlayVariants = {
    initial: { opacity: 0, scale: 1 },
    hover: {
      opacity: 1,
      scale: 1.25,
      y: 30,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  } as const;

  const titleVariants = {
    initial: { x: 300 },
    hover: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const dateVariants = {
    initial: { x: -300 },
    hover: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const descriptionTitleVariants = {
    initial: { x: 0 },
    hover: { x: -400, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const descriptionDateVariants = {
    initial: { x: 0 },
    hover: { x: 400, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const buttonVariants = {
    initial: { opacity: 1, pointerEvents: "none" },
    hover: {
      opacity: 1,
      pointerEvents: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  } as const;

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onCardClick(photo.id);
    }
  };

  return (
    <motion.article
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-labelledby={`painting-title-${photo.id}`}
      className="group relative block w-full border overflow-hidden rounded-lg bg-transparent transition-all shadow-md"
      initial="initial"
      animate={isActive ? "hover" : "initial"}
      whileHover="hover"
      onClick={() => onCardClick(photo.id)}
    >
      <motion.figure className="m-0 relative">
        <MotionImage
          src={photo.imagePainting}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
          loading={index < 6 ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-64 w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out"
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          variants={imageVariants}
        />

        <motion.figcaption
          variants={overlayVariants}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs"
        >
          <motion.span
            variants={titleVariants}
            className="px-14 text-center text-lg font-semibold text-zinc-50"
          >
            {photo.namePainting}
          </motion.span>
          <motion.p
            variants={dateVariants}
            className="text-sm text-muted-foreground mb-4"
          >
            {photo.datePainting}
          </motion.p>
          <motion.div variants={buttonVariants}>
            <Button
              className="pb-1 bg-zinc-300 hover:bg-zinc-300/90 text-zinc-800"
              asChild
              onClick={(e) => e.stopPropagation()}
            >
              <Link href={`/paintingsDetails/${photo.id}`}>Ver detalhes</Link>
            </Button>
          </motion.div>
        </motion.figcaption>
      </motion.figure>

      <div className="px-3 py-2 text-center">
        <motion.h2
          id={`painting-title-${photo.id}`}
          variants={descriptionTitleVariants}
          className="text-base font-medium truncate"
        >
          {photo.namePainting}
        </motion.h2>
        <motion.p
          variants={descriptionDateVariants}
          className="text-sm text-muted-foreground -mb-1"
        >
          {photo.datePainting}
        </motion.p>
      </div>
    </motion.article>
  );
});
