import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JournalEntry } from "@/data/journal";
import { CATEGORY_META } from "./categories";

interface JournalEntryCardProps {
  entry: JournalEntry;
  last?: boolean;
}

function ArrowRight() {
  return (
    <svg
      width="13"
      height="13"
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

export default function JournalEntryCard({ entry, last = false }: JournalEntryCardProps) {
  const cat = CATEGORY_META[entry.category];

  return (
    <article
      className={`grid gap-8 py-9 md:grid-cols-[1fr_0.82fr] md:gap-[44px] ${
        last ? "" : "border-b-2 border-dashed border-[color:rgba(60,42,33,0.2)]"
      }`}
    >
      <div className="order-2 self-center md:order-1">
        <div className="inline-flex items-center gap-[9px]">
          <span className={`h-[10px] w-[10px] shrink-0 ${cat.dot}`} />
          <span className={`text-[11px] font-semibold uppercase tracking-[0.13em] ${cat.text}`}>
            {entry.category}
          </span>
          <span className="text-[11px] text-brand-coffee/30">·</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-brand-coffee/50">
            {entry.date}
          </span>
        </div>

        <h3 className="mt-3.5 font-heading text-[26px] font-extrabold leading-[1.1] tracking-tight text-brand-coffee sm:text-[30px] lg:text-[34px]">
          <Link href={`/journal/${entry.slug}`} className="transition-colors hover:text-brand-terracotta">
            {entry.title}
          </Link>
        </h3>

        <p className="mt-3.5 line-clamp-2 max-w-[540px] text-[14px] font-light leading-[1.8] text-brand-coffee/70">
          {entry.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={`/journal/${entry.slug}`}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-terracotta transition-colors hover:text-brand-terracotta-dark"
          >
            Les hele saken <ArrowRight />
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-brand-coffee/40">
            {entry.author} · {entry.readingTime}
          </span>
        </div>
      </div>

      <Link
        href={`/journal/${entry.slug}`}
        className="stitch group order-1 block overflow-hidden bg-brand-coffee md:order-2"
      >
        <div className="relative aspect-[16/10] w-full md:aspect-auto md:h-[258px]">
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </Link>
    </article>
  );
}
