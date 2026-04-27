"use client";

import React, { useState, useMemo } from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import JournalEntryCard from "./JournalEntryCard";
import JournalFilters from "./JournalFilters";
import { JournalEntry } from "@/data/journal";

interface JournalPageProps {
  entries: JournalEntry[];
}

export default function JournalPage({ entries }: JournalPageProps) {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(entries.map((e) => e.category)));
    return cats;
  }, [entries]);

  const filteredEntries = useMemo(() => {
    if (activeCategory === "Alle") return entries;
    return entries.filter((e) => e.category === activeCategory);
  }, [entries, activeCategory]);

  return (
    <div className="bg-brand-linen min-h-screen">
      {/* Header Section */}
      <SectionContainer bgClass="bg-brand-linen pt-40 pb-20">
        <div className="max-w-4xl space-y-12">
          <div className="space-y-4">
            <span className="text-brand-terracotta font-bold uppercase tracking-[0.4em] text-[10px]">
              Dokumentasjon & Arkiv
            </span>
            <h1 className="text-7xl md:text-9xl font-heading font-bold text-brand-coffee tracking-tight">
              Feltjournal
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-brand-coffee/60 font-light max-w-2xl leading-relaxed italic">
            &quot;En samling av øyeblikk, mennesker og prosesser direkte fra kaffefeltene i Serranía del Perijá.&quot;
          </p>
        </div>
      </SectionContainer>

      {/* Filters Section */}
      <SectionContainer bgClass="bg-brand-linen py-6 border-y border-brand-coffee/[0.05] sticky top-[80px] z-20 backdrop-blur-md bg-brand-linen/90">
        <JournalFilters 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
      </SectionContainer>

      {/* List Section - Editorial Layout */}
      <SectionContainer bgClass="bg-brand-linen py-32 lg:py-48">
        <div className="flex flex-col gap-24 lg:gap-40">
          {filteredEntries.map((entry) => (
            <JournalEntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
        
        {filteredEntries.length === 0 && (
          <div className="py-40 text-center space-y-8">
            <p className="text-brand-coffee/30 italic text-xl">Ingen journalinnlegg funnet i denne kategorien.</p>
            <button 
              onClick={() => setActiveCategory("Alle")}
              className="text-brand-terracotta font-bold uppercase tracking-[0.3em] text-[10px] border-b border-brand-terracotta pb-1"
            >
              Tilbake til alle innlegg
            </button>
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
