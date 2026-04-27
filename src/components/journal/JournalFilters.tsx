import React from "react";

interface JournalFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function JournalFilters({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: JournalFiltersProps) {
  const allCategories = ["Alle", ...categories];

  return (
    <div className="flex flex-wrap items-center gap-8 md:gap-12">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${
            activeCategory === category
              ? "text-brand-terracotta"
              : "text-brand-coffee/40 hover:text-brand-coffee"
          }`}
        >
          {category}
          {activeCategory === category && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-terracotta" />
          )}
        </button>
      ))}
    </div>
  );
}
