const LEGACY_VARIANT_IMAGES = [
  "/assets/bag-origen.jpg",
  "/assets/bag-mestizaje.jpg",
  "/assets/bag-encuentro.jpg",
  "/assets/bag-heritage.jpg",
] as const;

interface VariantImageKey {
  grind: string | null;
  weightGrams: number | null;
}

function isAllowedImage(value: string): boolean {
  return (value.startsWith("/") && !value.startsWith("//")) || value.startsWith("https://");
}

export function readCatalogImages(images: unknown): string[] {
  if (!Array.isArray(images)) return [];

  return images.flatMap((image) => {
    const candidate =
      typeof image === "string"
        ? image
        : image && typeof image === "object" && !Array.isArray(image) && "url" in image
          ? image.url
          : null;

    return typeof candidate === "string" && isAllowedImage(candidate)
      ? [candidate]
      : [];
  });
}

export function getVariantDisplaySlot(variant: VariantImageKey): number {
  const grind = variant.grind?.trim().toLowerCase() ?? "";
  const ground = ["ground", "ground coffee", "malt", "molido"].includes(grind);
  const largeBag = (variant.weightGrams ?? 0) >= 500;
  return (largeBag ? 2 : 0) + (ground ? 1 : 0);
}

export function resolveCatalogVariantImage(
  images: unknown,
  variant: VariantImageKey,
): string {
  const configured = readCatalogImages(images);
  const slot = getVariantDisplaySlot(variant);
  return configured[slot] ?? configured[0] ?? LEGACY_VARIANT_IMAGES[slot];
}
