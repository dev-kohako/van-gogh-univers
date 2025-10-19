"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { ColorSwatchProps } from "@/types/paintingDetails.type";

export function ColorSwatch({ color, onCopy }: ColorSwatchProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timerId = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, [isCopied]);

  const handleCopy = () => {
    onCopy(color);
    setIsCopied(true);
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{
        scale: 1.15,
        rotate: 3,
        boxShadow: "0 0 20px rgba(0,0,0,0.25)",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={
        isCopied ? `Cor ${color} copiada!` : `Copiar cor ${color}`
      }
      className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-border shadow-lg cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
      style={{ backgroundColor: color }}
    >
      <AnimatePresence>
        {isCopied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full"
          >
            <Check
              className="text-zinc-50 w-6 h-6"
              aria-hidden="true"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <Copy
              className="text-zinc-50 opacity-80 w-5 h-5"
              aria-hidden="true"
            />
          </div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}