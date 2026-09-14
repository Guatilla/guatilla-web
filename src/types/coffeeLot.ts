/**
 * Ett registrert kaffeparti i sporbarhetssystemet (/sporbarhet).
 * Speiler tabellen `coffee_lots` i Cloud SQL — se gcp/sql/001_init_coffee_lots_and_waitlist.sql
 * og modellen CoffeeLot i prisma/schema.prisma.
 */
export interface LotImage {
  id: string;
  url: string;
  caption?: string;
}

export interface CoffeeLot {
  id: string;
  lot_number: string;
  active: boolean;

  // Produkt
  product_name: string | null;
  grind: string | null; // "Hele bønner" | "Malt"
  net_weight: string | null;
  roast_degree: string | null;
  roast_date: string | null; // ISO date
  best_before: string | null; // ISO date

  // Opprinnelse
  country: string | null;
  region: string | null;
  municipality: string | null;
  farm: string | null;
  producer: string | null;
  altitude: string | null;
  harvest_period: string | null;

  // Kaffen
  species: string | null;
  variety: string | null;
  grade: string | null; // "Excelso" | "Especial"
  process: string | null;
  screen_size: string | null;

  // Kvalitetskontroll
  moisture: string | null;
  water_activity: string | null;
  defects: string | null;
  lab_notes: string | null;
  cupping_score: string | null;
  flavour_profile: string | null;

  // Fra Colombia til Norge
  exporter: string | null;
  export_date: string | null;
  importer: string | null;
  received_date_norway: string | null;

  // Brenning og pakking
  roasted_by: string | null;
  packing_date: string | null;
  production_notes: string | null;

  // Historien bak kaffen
  story_text: string | null;
  story_video_url: string | null;
  images: LotImage[];

  created_at: string;
  updated_at: string;
}

/** Felter en admin kan sette; id/created_at/updated_at styres av databasen. */
export type CoffeeLotInput = Omit<CoffeeLot, "id" | "created_at" | "updated_at">;

export const EMPTY_LOT_INPUT: CoffeeLotInput = {
  lot_number: "",
  active: true,
  product_name: "",
  grind: "Hele bønner",
  net_weight: "250 g",
  roast_degree: "",
  roast_date: "",
  best_before: "",
  country: "Colombia",
  region: "",
  municipality: "",
  farm: "Finca La Guatilla",
  producer: "",
  altitude: "",
  harvest_period: "",
  species: "100 % Arabica",
  variety: "",
  grade: "Excelso",
  process: "Vasket",
  screen_size: "",
  moisture: "",
  water_activity: "",
  defects: "",
  lab_notes: "",
  cupping_score: "",
  flavour_profile: "",
  exporter: "CACE L&G S.A.S.",
  export_date: "",
  importer: "GUATILLA AS",
  received_date_norway: "",
  roasted_by: "GUATILLA AS",
  packing_date: "",
  production_notes: "",
  story_text: "",
  story_video_url: "",
  images: [],
};
