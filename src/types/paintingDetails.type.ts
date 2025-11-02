import * as THREE from "three";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Painting } from "./types";
import { RefObject } from "react";

export type PaintingLink = { id: string | number } | undefined;

export type PaintingSceneProps = Omit<Painting3DViewerProps, "onClose" | "title">;

export interface PaintingImageProps {
  painting: Painting;
  prevPainting: PaintingLink | null;
  nextPainting: PaintingLink | null;
  onShow3D: () => void;
  onOpenFullscreen: () => void;
}

export interface PaintingDetailsProps {
  painting: Painting;
}

export interface PaintingHeaderProps {
  painting: Painting;
}

export interface FullscreenImageViewerProps {
  painting: Painting;
  onClose: () => void;
}

export interface Painting3DViewerProps {
  imageUrl: string;
  title: string;
  width: number;
  height: number;
  onClose: () => void;
}

export interface FramedPaintingProps {
  width: number;
  height: number;
  scaledWidth: number;
  scaledHeight: number;
  texture: THREE.Texture;
}

export interface FrameBackProps {
  frameWidth: number;
  frameHeight: number;
  frameDepth: number;
}

export interface GalleryPlaqueProps {
  width: number;
  height: number;
}

export interface PaletteProps {
  colors: string[];
}

export interface ColorSwatchProps {
  color: string;
  onCopy: (color: string) => void;
}

export type SceneSetupAndAnimationProps = {
  controlsRef: RefObject<OrbitControlsImpl | null>;
  targetPosition: Vector3;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface PaintingNavigationProps {
  prevPainting: PaintingLink;
  nextPainting: PaintingLink;
}
