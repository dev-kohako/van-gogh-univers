"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.section
        role="alert"
        aria-live="assertive"
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <AlertTriangle
          className="w-16 h-16 text-destructive mb-4"
          aria-hidden="true"
        />

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Algo deu errado
        </h1>

        <p className="text-muted-foreground mb-8 max-w-md text-base sm:text-lg leading-relaxed">
          Ocorreu um erro inesperado durante o carregamento desta página.
          Você pode tentar novamente ou retornar à página inicial.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="default"
            onClick={() => reset()}
            aria-label="Tentar novamente"
          >
            <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" />
            Tentar novamente
          </Button>

          <Button
            variant="ghost"
            asChild
            aria-label="Voltar à página inicial"
          >
            <Link href="/" className="inline-flex items-center">
              <Home className="w-4 h-4 mr-2" aria-hidden="true" />
              Página inicial
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <motion.pre
            className="mt-6 text-sm text-muted-foreground bg-muted/50 p-4 rounded-xl w-full max-w-xl overflow-auto text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {error.message}
          </motion.pre>
        )}
      </motion.section>
    </AnimatePresence>
  );
}
