import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalEntries } from "@/data/journal";
import SectionContainer from "@/components/ui/SectionContainer";
import { ArrowLeft, Calendar, User } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function JournalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="bg-brand-linen min-h-screen">
      {/* Header Section */}
      <SectionContainer bgClass="bg-brand-linen pt-40 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <Link 
            href="/journal"
            className="group inline-flex items-center gap-3 text-brand-coffee/40 hover:text-brand-terracotta transition-colors font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Tilbake til feltjournalen
          </Link>

          <div className="space-y-8">
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-coffee/30">
              <span className="text-brand-terracotta">{entry.category}</span>
              <span className="w-1 h-1 rounded-full bg-brand-coffee/20" />
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                <span>{entry.date}</span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-brand-coffee leading-[0.9] tracking-tight">
              {entry.title}
            </h1>
          </div>
        </div>
      </SectionContainer>

      {/* Featured Image - Grayscale to Color hover */}
      <SectionContainer bgClass="bg-brand-linen pb-32 lg:pb-48">
        <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-brand-cream border border-brand-coffee/[0.05]">
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            className="object-cover grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0 group-hover:scale-[1.02]"
            priority
          />
        </div>
      </SectionContainer>

      {/* Content */}
      <SectionContainer bgClass="bg-brand-linen pb-64">
        <div className="max-w-3xl mx-auto space-y-20">
          <div className="prose prose-brand-coffee prose-xl max-w-none">
            <p className="text-2xl md:text-4xl text-brand-coffee/80 font-light leading-relaxed mb-20 italic border-l-2 border-brand-terracotta/20 pl-10">
              {entry.excerpt}
            </p>
            <div className="text-xl text-brand-coffee/70 font-light leading-loose whitespace-pre-wrap space-y-12">
              {entry.content}
            </div>
          </div>

          {/* Footer Meta */}
          <div className="pt-20 border-t border-brand-coffee/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-coffee/[0.03] flex items-center justify-center text-brand-coffee/20">
                <User size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-coffee/30">Arkivansvarlig</p>
                <p className="font-bold text-brand-coffee text-sm">{entry.author}</p>
              </div>
            </div>
            
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-coffee/20">
              KAFFE GUATILLA &copy; 2024
            </div>
          </div>
        </div>
      </SectionContainer>
    </article>
  );
}
