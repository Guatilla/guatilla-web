import { JournalEntry } from "@/data/journal";

/**
 * Fargekoding per kategori — et lite stoff-flekk-kvadrat + tekstfarge.
 * Territorium: terracotta · Mennesker: skog · Prosess: teal · Kvalitet: gull.
 */
export const CATEGORY_META: Record<
  JournalEntry["category"],
  { dot: string; text: string }
> = {
  Territorium: { dot: "bg-brand-terracotta", text: "text-brand-terracotta-dark" },
  Mennesker: { dot: "bg-brand-forest", text: "text-brand-forest" },
  Prosess: { dot: "bg-brand-teal", text: "text-brand-teal" },
  Kvalitet: { dot: "bg-brand-gold", text: "text-[#B07E1E]" },
};
