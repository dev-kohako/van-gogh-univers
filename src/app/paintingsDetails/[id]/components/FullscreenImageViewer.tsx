"use client";

import { useRef } from "react";
import LightGallery from "lightgallery/react";
import { LightGallery as ILightGallery } from "lightgallery/lightgallery";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-fullscreen.css";

import { FullscreenImageViewerProps } from "@/types/paintingDetails.type";

export function FullscreenImageViewer({
  painting,
  onClose,
}: FullscreenImageViewerProps) {
  const lightGalleryRef = useRef<ILightGallery | null>(null);

  const galleryItems = [
    {
      src: painting.imagePainting,
      subHtml: `<h4>${painting.namePainting}</h4><p>${painting.datePainting}</p>`,
    },
  ];

  return (
    <LightGallery
      onInit={(detail) => {
        if (detail) {
          lightGalleryRef.current = detail.instance;
          setTimeout(() => detail.instance.openGallery(0), 50);
        }
      }}
      onAfterClose={() => onClose?.()}
      closable
      counter={false}
      plugins={[lgZoom, lgFullscreen]}
      speed={500}
      download={false}
      dynamic={true}
      dynamicEl={galleryItems}
    />
  );
}
