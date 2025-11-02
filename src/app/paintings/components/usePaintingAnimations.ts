export function usePaintingAnimations() {
  const imageVariants = {
    initial: { y: 0, scale: 1.015 },
    hover: {
      y: 30,
      scale: 1.25,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  } as const;

  const overlayVariants = {
    initial: { opacity: 0, scale: 1 },
    hover: {
      opacity: 1,
      scale: 1.25,
      y: 30,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  } as const;

  const titleVariants = {
    initial: { x: 300 },
    hover: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const dateVariants = {
    initial: { x: -300 },
    hover: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const descriptionTitleVariants = {
    initial: { x: 0 },
    hover: { x: -400, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const descriptionDateVariants = {
    initial: { x: 0 },
    hover: { x: 400, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const buttonVariants = {
    initial: { opacity: 1, pointerEvents: "none" },
    hover: {
      opacity: 1,
      pointerEvents: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  } as const;

  return {
    imageVariants,
    overlayVariants,
    titleVariants,
    dateVariants,
    descriptionTitleVariants,
    descriptionDateVariants,
    buttonVariants,
  };
}
