import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journalEntries } from "@/data/journal";

interface JournalGridProps {
  limit?: number;
  showCTA?: boolean;
}

export default function JournalGrid({ limit, showCTA = true }: JournalGridProps) {
  const entries = limit ? journalEntries.slice(0, limit) : journalEntries;

  return (
    <div className="space-y-16">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/journal/${entry.slug}`}
            className="group flex flex-col cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-brand-coffee/10 bg-brand-cream shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(60,42,33,0.12)] transition-all duration-500 ease-out hover:scale-[1.02] mb-6">
              <Image
                src={entry.image}
                alt={entry.title}
                fill
                className="object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>

            {/* Meta */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-brand-coffee/60 uppercase tracking-widest">
                <span>{entry.category}</span>
                <span className="w-1 h-1 rounded-full bg-brand-coffee/30" />
                <span>{entry.date}</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee group-hover:text-brand-terracotta transition-colors">
                {entry.title}
              </h3>
              <p className="text-sm text-brand-coffee/70 font-light line-clamp-2">
                {entry.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      {showCTA && (
        <div className="pt-12 text-center">
          <Link
            href="/journal"
            className="inline-flex items-center space-x-2 text-brand-coffee font-bold uppercase tracking-widest text-sm group hover:text-brand-terracotta transition-colors"
          >
            <span>Se alle journaler</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
