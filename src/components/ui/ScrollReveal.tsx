"use client";

import { MarginType, motion, MotionProps, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  rootMargin?: MarginType;
}

export function ScrollReveal({
  children,
  className,
  initial,
  animate,
  transition,
  once = true,
  rootMargin = "-50px",
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: rootMargin });

  const motionConfig = useMemo(
    () => ({
      initial: initial ?? { opacity: 0, y: 40 },
      animate: animate ?? { opacity: 1, y: 0 },
      transition: transition ?? { duration: 0.6, ease: "easeOut" },
    }),
    [initial, animate, transition]
  );

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      initial={motionConfig.initial}
      animate={isInView ? motionConfig.animate : undefined}
      transition={motionConfig.transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
