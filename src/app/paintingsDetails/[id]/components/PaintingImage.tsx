"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Box, ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaintingImageProps } from "@/types/paintingDetails.type";
import Link from "next/link";

export function PaintingImage({
  painting,
  prevPainting,
  nextPainting,
  onShow3D,
  onOpenFullscreen,
}: PaintingImageProps) {
  const navButtonClasses =
    "absolute top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/40 text-zinc-50 hover:text-zinc-100 rounded-full p-2 shadow-md h-7 w-7 sm:h-9 sm:w-9";

  return (
    <motion.div
      role="group"
      aria-label="Visualizador da pintura"
      className="relative w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-border">
        <Image
          src={painting.imagePainting}
          alt={painting.alt}
          width={painting.width}
          height={painting.height}
          priority
          className="rounded-2xl object-cover w-full h-auto"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
        <Button
          onClick={onOpenFullscreen}
          aria-label={`Ver ${painting.alt} em tela cheia`}
          size="icon"
          className="absolute bottom-3 right-3 z-20 !bg-transparent backdrop-blur-lg border border-border lg:opacity-0 opacity-100 lg:group-hover:opacity-100 transition-opacity"
        >
          <Maximize
            strokeWidth={2}
            className="w-6 h-6 -mt-1 text-zinc-50"
            aria-hidden="true"
          />
        </Button>

        {prevPainting && (
          <Button
            asChild
            variant="outline"
            size="icon"
            className={`${navButtonClasses} left-2`}
            aria-label="Ver pintura anterior: Pintura anterior"
          >
            <Link href={`/paintingsDetails/${prevPainting.id}`}>
              <ChevronLeft
                strokeWidth={3}
                className="-ms-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
        )}

        {nextPainting && (
          <Button
            asChild
            variant="outline"
            size="icon"
            className={`${navButtonClasses} right-2`}
            aria-label="Ver pintura seguinte: Pintura seguinte"    
          >
            <Link href={`/paintingsDetails/${nextPainting.id}`}>
              <ChevronRight
                strokeWidth={3}
                className="-me-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
        )}
      </div>

      <Button
        onClick={onShow3D}
        className="mt-4 px-6 pb-1 w-full"
        aria-label={`Visualizar ${painting.alt} em 3D`}
      >
        Visualizar em 3D
        <Box
          className="-ml-1 -mt-1"
          aria-hidden="true"
        />
      </Button>
    </motion.div>
  );
}