import React from "react";
import { JournalEntry } from "@/data/journal";
import { CATEGORY_META } from "./categories";

interface JournalFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function JournalFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: JournalFiltersProps) {
  const allCategories = ["Alle", ...categories];

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {allCategories.map((category) => {
        const active = activeCategory === category;
        const meta =
          category !== "Alle"
            ? CATEGORY_META[category as JournalEntry["category"]]
            : null;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`inline-flex items-center gap-2 px-[15px] py-2 text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors ${
              active
                ? "stitch bg-brand-gold font-bold text-brand-coffee"
                : "text-brand-coffee/60 hover:text-brand-coffee"
            }`}
          >
            {meta && <span className={`h-[10px] w-[10px] ${meta.dot}`} />}
            {category}
          </button>
        );
      })}
    </div>
  );
}
