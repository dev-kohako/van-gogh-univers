import { usePaintingAnimations } from "../usePaintingAnimations";

describe("usePaintingAnimations", () => {
  it("returns all expected animation variant keys", () => {
    const result = usePaintingAnimations();

    expect(Object.keys(result)).toEqual([
      "imageVariants",
      "overlayVariants",
      "titleVariants",
      "dateVariants",
      "descriptionTitleVariants",
      "descriptionDateVariants",
      "buttonVariants",
    ]);
  });
});
