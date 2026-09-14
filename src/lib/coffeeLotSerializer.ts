import type { CoffeeLot as PrismaCoffeeLot, Prisma } from "@prisma/client";
import type { CoffeeLot, CoffeeLotInput, LotImage } from "@/types/coffeeLot";

const STRING_FIELDS = [
  ["product_name", "productName"],
  ["grind", "grind"],
  ["net_weight", "netWeight"],
  ["roast_degree", "roastDegree"],
  ["country", "country"],
  ["region", "region"],
  ["municipality", "municipality"],
  ["farm", "farm"],
  ["producer", "producer"],
  ["altitude", "altitude"],
  ["harvest_period", "harvestPeriod"],
  ["species", "species"],
  ["variety", "variety"],
  ["grade", "grade"],
  ["process", "process"],
  ["screen_size", "screenSize"],
  ["moisture", "moisture"],
  ["water_activity", "waterActivity"],
  ["defects", "defects"],
  ["lab_notes", "labNotes"],
  ["cupping_score", "cuppingScore"],
  ["flavour_profile", "flavourProfile"],
  ["exporter", "exporter"],
  ["importer", "importer"],
  ["roasted_by", "roastedBy"],
  ["production_notes", "productionNotes"],
  ["story_text", "storyText"],
  ["story_video_url", "storyVideoUrl"],
] as const satisfies ReadonlyArray<[keyof CoffeeLotInput, string]>;

const DATE_FIELDS = [
  ["roast_date", "roastDate"],
  ["best_before", "bestBefore"],
  ["export_date", "exportDate"],
  ["received_date_norway", "receivedDateNorway"],
  ["packing_date", "packingDate"],
] as const satisfies ReadonlyArray<[keyof CoffeeLotInput, string]>;

function toDateString(value: Date | null): string | null {
  return value ? value.toISOString().slice(0, 10) : null;
}

/** Rad fra Prisma (camelCase, Date-objekter) → CoffeeLot slik frontend forventer det (snake_case, ISO-strenger). */
export function serializeCoffeeLot(row: PrismaCoffeeLot): CoffeeLot {
  const result = {
    id: row.id,
    lot_number: row.lotNumber,
    active: row.active,
    images: (row.images as unknown as LotImage[]) ?? [],
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  } as CoffeeLot;

  const target = result as unknown as Record<string, unknown>;
  for (const [snake, camel] of STRING_FIELDS) {
    target[snake] = (row as unknown as Record<string, unknown>)[camel] ?? null;
  }
  for (const [snake, camel] of DATE_FIELDS) {
    target[snake] = toDateString((row as unknown as Record<string, Date | null>)[camel]);
  }

  return result;
}

/** Body fra admin-skjemaet (snake_case) → Prisma create/update input (camelCase). Tomme strenger → null. */
export function deserializeCoffeeLotInput(
  body: Partial<CoffeeLotInput>
): Prisma.CoffeeLotUncheckedCreateInput {
  const data: Record<string, unknown> = {};

  if (body.lot_number !== undefined) data.lotNumber = body.lot_number.trim();
  if (body.active !== undefined) data.active = body.active;
  if (body.images !== undefined) data.images = body.images;

  for (const [snake, camel] of STRING_FIELDS) {
    const value = body[snake];
    if (value !== undefined) data[camel] = value === "" ? null : value;
  }
  for (const [snake, camel] of DATE_FIELDS) {
    const value = body[snake];
    if (value !== undefined) data[camel] = value ? new Date(value) : null;
  }

  return data as Prisma.CoffeeLotUncheckedCreateInput;
}
