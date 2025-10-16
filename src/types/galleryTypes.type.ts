import { Variants } from "motion/react";
import { Painting } from "./types";

export interface AnimationVariants {
  hover: Variants;
  overlay: Variants;
  title: Variants;
}

export interface PaintingCardProps {
  painting: Painting;
  index: number;
  variants: AnimationVariants;
}