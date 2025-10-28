"use client";

import LightGallery from "lightgallery/react";
import { motion } from "framer-motion";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import { useGallery } from "./useGallery";
import { data_painting } from "../../../public/data/data.json";
import { Painting } from "@/types/types";
import { GalleryCard } from "./components/GalleryCard";
import { EmptySection } from "@/components/empty-section";
import { Image } from "lucide-react";

export default function GalleryPage() {
  const { scaleX, hoverVariants, overlayVariants, titleVariants } =
    useGallery();

  const paintings: Painting[] = (data_painting || [])
    .filter((p) => p.width && p.height && p.imagePainting)
    .map((p) => ({
      ...p,
      imagePainting: `/assets/paintings/${p.imagePainting}`,
      alt: `Obra "${p.namePainting}" (${p.datePainting}) por Van Gogh.`,
    }));

  return (
    <motion.main className="my-16 px-[7.5%] md:my-20">
      <motion.div
        className="fixed left-0 right-0 top-0 z-40 h-1 origin-left bg-foreground"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <header className="mb-8 text-center md:pl-10 2xl:pl-5">
        <motion.h1
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          id="gallery-title"
          className="text-5xl font-bold sm:text-7xl"
        >
          Galeria
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="mt-3 text-lg text-muted-foreground"
        >
          Uma coleção para contemplar, explorar e apreciar em cada detalhe.
        </motion.p>
      </header>

      {paintings.length > 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          aria-labelledby="gallery-title"
          className="mx-auto w-full max-w-7xl md:pl-10 2xl:pl-5"
        >
          <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="columns-2 gap-2 sm:gap-4 md:columns-3 lg:columns-4 xl:columns-5"
          >
            {paintings.map((painting, i) => (
              <GalleryCard
                key={painting.id}
                painting={painting}
                index={i}
                variants={{
                  hover: hoverVariants,
                  overlay: overlayVariants,
                  title: titleVariants,
                }}
              />
            ))}
          </LightGallery>
        </motion.section>
      ) : (
        <EmptySection
          icon={<Image aria-hidden="true" className="h-16 w-16" />}
          title="Nenhuma Pintura Encontrada"
          description={`Sem obras no momento.`}
          onClear={() => {window.location.reload()}}
          buttonText="Recarregar Página"
        />
      )}
    </motion.main>
  );
}
