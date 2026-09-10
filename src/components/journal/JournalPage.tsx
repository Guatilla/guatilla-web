"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { JournalEntry } from "@/data/journal";
import JournalEntryCard from "./JournalEntryCard";
import JournalFilters from "./JournalFilters";
import Seam from "@/components/ui/Seam";
import { CATEGORY_META } from "./categories";

interface JournalPageProps {
  entries: JournalEntry[];
}

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")";

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function FeaturedEntry({ entry }: { entry: JournalEntry }) {
  const cat = CATEGORY_META[entry.category];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_1fr] lg:gap-[46px]">
      <Link
        href={`/journal/${entry.slug}`}
        className="stitch pop group block -rotate-[0.5deg] overflow-hidden bg-brand-coffee"
      >
        <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-[468px]">
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </Link>

      <div>
        <div className="inline-flex items-center gap-[9px]">
          <span className={`h-[11px] w-[11px] shrink-0 ${cat.dot}`} />
          <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${cat.text}`}>
            {entry.category}
          </span>
          <span className="text-[11px] text-brand-coffee/30">·</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-coffee/50">
            {entry.date}
          </span>
        </div>

        <h2 className="mt-[18px] font-heading text-[34px] font-extrabold leading-[1.06] tracking-tight text-brand-coffee sm:text-[42px]">
          <Link href={`/journal/${entry.slug}`} className="transition-colors hover:text-brand-terracotta">
            {entry.title}
          </Link>
        </h2>

        <p className="mt-[18px] max-w-[470px] text-[15.5px] font-light leading-[1.85] text-brand-coffee/70">
          {entry.excerpt}
        </p>

        <Link
          href={`/journal/${entry.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-terracotta transition-colors hover:text-brand-terracotta-dark"
        >
          Les hele saken <ArrowRight />
        </Link>

        <p className="mt-[22px] text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-coffee/40">
          {entry.author} · {entry.readingTime} lesing
        </p>
      </div>
    </div>
  );
}

export default function JournalPage({ entries }: JournalPageProps) {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const categories = useMemo(
    () => Array.from(new Set(entries.map((e) => e.category))),
    [entries]
  );

  const filteredEntries = useMemo(() => {
    if (activeCategory === "Alle") return entries;
    return entries.filter((e) => e.category === activeCategory);
  }, [entries, activeCategory]);

  const featured = filteredEntries[0];
  const rest = filteredEntries.slice(1);

  return (
    <div className="min-h-screen bg-brand-linen" style={{ backgroundImage: NOISE_BG }}>
      {/* Header */}
      <section className="container-page pt-16 pb-11 lg:pt-[72px] lg:pb-[52px]">
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-coffee/45">
          Dokumentasjon &amp; arkiv
        </span>
        <h1 className="mt-4 font-heading text-[64px] font-extrabold leading-[0.98] tracking-tight text-brand-coffee sm:text-[80px] lg:text-[94px]">
          Feltjournal
        </h1>
        <p className="mt-6 max-w-[680px] font-heading text-[19px] font-normal italic leading-[1.5] text-brand-coffee/[0.66] lg:text-[24px]">
          En samling av øyeblikk, mennesker og prosesser — direkte fra kaffefeltene
          i Serranía del Perijá.
        </p>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-coffee/50">
          {entries.length} innlegg · Sist oppdatert {entries[0]?.date}
        </p>
      </section>

      {/* Filters */}
      <div className="border-y-[2.5px] border-dashed border-[color:rgba(60,42,33,0.3)]">
        <div className="container-page py-[15px]">
          <JournalFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <section className="container-page py-16 text-center">
          <p className="font-heading text-xl italic text-brand-coffee/40">
            Ingen journalinnlegg funnet i denne kategorien.
          </p>
          <button
            onClick={() => setActiveCategory("Alle")}
            className="mt-8 border-b border-brand-terracotta pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-terracotta"
          >
            Tilbake til alle innlegg
          </button>
        </section>
      ) : (
        <>
          {featured && (
            <section className="container-page pt-14 pb-6">
              <FeaturedEntry entry={featured} />
            </section>
          )}

          {rest.length > 0 && (
            <section className="container-page pb-16 pt-[52px]">
              <Seam label="Flere innlegg" />
              <div className="mt-14 flex flex-col">
                {rest.map((entry, i) => (
                  <JournalEntryCard
                    key={entry.slug}
                    entry={entry}
                    last={i === rest.length - 1}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
