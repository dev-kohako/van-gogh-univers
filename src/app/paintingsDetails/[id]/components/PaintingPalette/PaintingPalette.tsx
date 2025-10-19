"use client";

import { toast } from "sonner";
import copy from "copy-to-clipboard";
import { PaletteProps } from "@/types/paintingDetails.type";
import { ColorSwatch } from "./ColorSwatch";

export function PaintingPalette({ colors }: PaletteProps) {
  const handleCopyToClipboard = (color: string) => {
    if (copy(color)) {
      toast.success(`Cor ${color.toUpperCase()} copiada com sucesso!`);
    } else {
      toast.error("Falha ao copiar a cor.");
    }
  };

  return (
    <section
      aria-labelledby="palette-heading"
      className="mt-10"
    >
      <h3 id="palette-heading" className="text-lg font-semibold text-foreground mb-4">
        Paleta de cores
      </h3>

      <div className="grid grid-cols-5 gap-3 lg:gap-5 w-fit">
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            onCopy={handleCopyToClipboard}
          />
        ))}
      </div>
    </section>
  );
}