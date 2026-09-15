import { NextRequest, NextResponse } from "next/server";
import { getStorefrontCartLines } from "@/lib/catalog";
import { buildCatalogVersion } from "@/lib/catalogVersion";
import { isUuid } from "@/lib/catalogValidation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const items =
    body &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    Object.keys(body).every((key) => key === "items") &&
    "items" in body
      ? (body as { items?: unknown }).items
      : null;

  if (
    !Array.isArray(items) ||
    items.length > 50 ||
    !items.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        Object.keys(item).every((key) => key === "variantId" || key === "quantity") &&
        typeof (item as { variantId?: unknown }).variantId === "string" &&
        isUuid((item as { variantId: string }).variantId) &&
        Number.isSafeInteger((item as { quantity?: unknown }).quantity) &&
        Number((item as { quantity: number }).quantity) >= 1 &&
        Number((item as { quantity: number }).quantity) <= 99,
    )
  ) {
    return NextResponse.json({ error: "Invalid cart list." }, { status: 400 });
  }

  const requestedItems = items as Array<{ variantId: string; quantity: number }>;
  const uniqueIds = [...new Set(requestedItems.map((item) => item.variantId))];
  if (uniqueIds.length !== requestedItems.length) {
    return NextResponse.json({ error: "Invalid cart list." }, { status: 400 });
  }

  try {
    const lines = await getStorefrontCartLines(requestedItems);
    const byId = new Map(lines.map((line) => [line.variantId, line]));
    const orderedLines = uniqueIds.flatMap((id) => {
        const line = byId.get(id);
        return line ? [line] : [];
      });
    return NextResponse.json({
      lines: orderedLines,
      catalogVersion: buildCatalogVersion(orderedLines),
    });
  } catch {
    return NextResponse.json(
      { error: "Catalog unavailable." },
      { status: 503 },
    );
  }
}
