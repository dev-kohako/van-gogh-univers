"use client";

import { motion } from "framer-motion";
import React, { memo, useMemo } from "react";
import { InfoGridProps } from "@/types/about.type";
import { vanGoghInfo } from "../../../../../public/data/vanGoghInfos";

function formatLabel(label: string) {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

const InfoGrid = memo(function InfoGrid({ data }: InfoGridProps) {
  const formattedEntries = useMemo(() => Object.entries(data), [data]);

  return (
    <motion.dl
      className="flex flex-col gap-x-8 gap-y-2 md:gap-y-3.5 text-base leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Informações biográficas de Van Gogh"
    >
      {formattedEntries.map(([label, value]) => (
        <motion.div
          key={label}
          className="text-foreground font-light flex items-start"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className="font-bold text-foreground">
            {formatLabel(label)}:{" "}
            <span className="text-muted-foreground font-normal">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          </p>
        </motion.div>
      ))}
    </motion.dl>
  );
});

export default function AboutPage() {
  return (
    <section className="mt-4" aria-labelledby="about-title">
      <motion.h2
        id="about-title"
        className="text-5xl 2xl:text-6xl text-center text-foreground font-semibold mb-6"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Vincent Willem
        <br />
        Van Gogh
      </motion.h2>

      <InfoGrid data={vanGoghInfo} />
    </section>
  );
}
