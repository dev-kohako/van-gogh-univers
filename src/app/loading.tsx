"use client";

import { LoaderOne } from "@/components/ui/loader";
import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.section
        role="status"
        aria-busy="true"
        aria-live="polite"
        className="flex flex-col items-center justify-center gap-6 min-h-screen px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-center">
          <LoaderOne color="from-blue-700 via-blue-500 to-cyan-700 border-none" aria-hidden="true" />
        </div>

        <motion.p
          className="text-base sm:text-lg text-muted-foreground font-medium select-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          Carregando conteúdo...
        </motion.p>
      </motion.section>
    </AnimatePresence>
  );
}
