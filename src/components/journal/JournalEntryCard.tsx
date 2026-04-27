import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JournalEntry } from "@/data/journal";
import { Calendar, ArrowRight } from "lucide-react";

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export default function JournalEntryCard({ entry }: JournalEntryCardProps) {
  return (
    <Link 
      href={`/journal/${entry.slug}`}
      className="group block bg-white/40 border border-brand-coffee/[0.08] rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:bg-white"
    >
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Content Side */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-coffee/40">
            <span className="text-brand-terracotta">{entry.category}</span>
            <span className="w-1 h-1 rounded-full bg-brand-coffee/20" />
            <div className="flex items-center gap-1.5">
              <Calendar size={12} />
              <span>{entry.date}</span>
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-coffee leading-tight">
            {entry.title}
          </h3>
          
          <p className="text-lg text-brand-coffee/60 font-light leading-relaxed line-clamp-3 max-w-xl">
            {entry.excerpt}
          </p>

          <div className="pt-4 inline-flex items-center gap-2 text-brand-coffee font-bold uppercase tracking-widest text-[11px] group-hover:text-brand-terracotta transition-colors">
            Les hele saken <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-2/5 lg:w-1/2 relative aspect-square md:aspect-auto min-h-[300px] overflow-hidden bg-brand-cream">
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>
      </div>
    </Link>
  );
}
