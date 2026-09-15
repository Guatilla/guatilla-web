import "server-only";

import { createHash } from "node:crypto";

interface VersionedCartLine {
  variantId: string;
  priceOre: number;
  inStock: boolean;
}

export function buildCatalogVersion(lines: VersionedCartLine[]): string {
  const canonical = [...lines]
    .sort((left, right) => left.variantId.localeCompare(right.variantId))
    .map((line) => `${line.variantId}:${line.priceOre}:${line.inStock ? 1 : 0}`)
    .join("|");

  return createHash("sha256").update(canonical).digest("hex");
}
