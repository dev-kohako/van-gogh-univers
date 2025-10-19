"use client";

import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { Painting3DViewerProps } from "@/types/paintingDetails.type";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { PaintingScene } from "./PaintingScene";

export function Painting3DViewer({
  imageUrl,
  width,
  height,
  onClose,
  title,
}: Painting3DViewerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  const hasRequiredData =
    Boolean(width) && Boolean(height) && Boolean(imageUrl);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Visualizador 3D"}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-grab active:cursor-grabbing bg-black/70 backdrop-blur-lg"
    >
      <Button
        className="absolute top-5 right-5 z-10 pb-1 text-zinc-50 hover:text-zinc-800 dark:text-zinc-50"
        onClick={onClose}
        aria-label="Fechar visualizador 3D"
        variant="ghost"
        size="icon"
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </Button>

      {hasRequiredData ? (
        <Canvas
          shadows
          camera={{ position: [0, 2, 12], fov: 50 }}
          dpr={[1, 2]}
          className="w-full h-fit"
          aria-label={`Visualização 3D interativa de ${title}`}
        >
          <Suspense
            fallback={
              <Html center>
                <span className="text-zinc-50 text-lg text-nowrap flex items-center gap-2">
                  <Spinner className="text-zinc-50 size-6 mb-1.5" />
                  Carregando obra...
                </span>
              </Html>
            }
          >
            <PaintingScene imageUrl={imageUrl} width={width} height={height} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="flex items-center justify-center text-white text-lg text-nowrap flex-col gap-2">
          <Spinner />
          Carregando dados da obra...
        </div>
      )}
    </div>
  );
}
