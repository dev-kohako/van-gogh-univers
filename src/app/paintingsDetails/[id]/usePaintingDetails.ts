import { useState, useEffect, useMemo } from "react";
import { data_painting } from "../../../../public/data/data.json";
import { Painting } from "@/types/types";

export function usePaintingDetails(painting: Painting | undefined) {
  const [show3D, setShow3D] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
        setShow3D(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { prevPainting, nextPainting } = useMemo(() => {
    if (!painting) return { prevPainting: undefined, nextPainting: undefined };
    const currentId = Number(painting.id);
    const prev = data_painting.find((p) => Number(p.id) === currentId - 1);
    const next = data_painting.find((p) => Number(p.id) === currentId + 1);
    return { prevPainting: prev, nextPainting: next };
  }, [painting]);

  return {
    prevPainting,
    nextPainting,
    show3D,
    setShow3D,
    isFullscreen,
    setIsFullscreen,
  };
}