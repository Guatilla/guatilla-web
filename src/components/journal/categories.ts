import { JournalEntry } from "@/data/journal";

/**
 * Fargekoding per kategori ("modern patchwork") — flekk-farge + tekstfarge (hex).
 * Territorium: terracotta · Mennesker: oliven · Prosess: teal · Kvalitet: gull.
 */
export const CATEGORY_META: Record<
  JournalEntry["category"],
  { dot: string; text: string }
> = {
  Territorium: { dot: "#A94B2F", text: "#8A3E2F" },
  Mennesker: { dot: "#5C7148", text: "#4F6F52" },
  Prosess: { dot: "#1F4B4B", text: "#214D51" },
  Kvalitet: { dot: "#DDA83A", text: "#B07E1E" },
};
