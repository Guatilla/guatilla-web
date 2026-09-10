import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  journalEntries,
  getJournalEntryBySlug,
  getRelatedJournalEntries,
} from "@/data/journal";
import Seam from "@/components/ui/Seam";
import { CATEGORY_META } from "@/components/journal/categories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")";

function BackLink({ strong = false }: { strong?: boolean }) {
  return (
    <Link
      href="/journal"
      className={`group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-brand-terracotta ${
        strong ? "text-brand-coffee" : "text-brand-coffee/50"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:-translate-x-1"
      >
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </svg>
      Tilbake til feltjournalen
    </Link>
  );
}

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);
  if (!entry) return { title: "Innlegg ikke funnet | Kaffe Guatilla" };
  return { title: `${entry.title} | Feltjournal`, description: entry.excerpt };
}

export default async function JournalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const cat = CATEGORY_META[entry.category];
  const related = getRelatedJournalEntries(slug, 3);
  const paragraphs = entry.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="bg-brand-linen" style={{ backgroundImage: NOISE_BG }}>
      {/* Back */}
      <div className="container-page pt-9">
        <BackLink />
      </div>

      {/* Header */}
      <section className="container-page pb-11 pt-10">
        <div className="mx-auto max-w-[760px]">
          <div className="inline-flex items-center gap-[10px]">
            <span className={`h-[11px] w-[11px] shrink-0 ${cat.dot}`} />
            <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${cat.text}`}>
              {entry.category}
            </span>
            <span className="text-[11px] text-brand-coffee/30">·</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-coffee/50">
              {entry.date}
            </span>
          </div>
          <h1 className="mt-5 font-heading text-[42px] font-extrabold leading-[0.98] tracking-tight text-brand-coffee sm:text-[60px] lg:text-[76px]">
            {entry.title}
          </h1>
        </div>
      </section>

      {/* Featured image */}
      <section className="container-page pb-14">
        <div className="stitch pop -rotate-[0.4deg] overflow-hidden bg-brand-coffee">
          <div className="relative h-[300px] w-full sm:h-[420px] lg:h-[560px]">
            <Image
              src={entry.image}
              alt={entry.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-page pb-16">
        <div className="mx-auto max-w-[760px]">
          <p className="border-l-[3px] border-[color:rgba(208,105,77,0.35)] pl-6 font-heading text-[22px] font-normal italic leading-[1.42] text-brand-coffee/80 sm:pl-[34px] sm:text-[30px]">
            {entry.excerpt}
          </p>

          <div className="mt-10 flex flex-col gap-6 sm:mt-11">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[16px] font-light leading-[1.9] text-brand-coffee/[0.72] sm:text-[18px]"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-9 flex items-center justify-between border-t-2 border-dashed border-[color:rgba(60,42,33,0.2)] pt-6 sm:mt-[52px]">
            <div className="flex items-center gap-3.5">
              <span className="stitch flex h-11 w-11 items-center justify-center text-brand-coffee/35">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
                </svg>
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-coffee/35">
                  Arkivansvarlig
                </p>
                <p className="mt-0.5 text-sm font-semibold text-brand-coffee">
                  {entry.author}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-coffee/25">
              Kaffe Guatilla © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </section>

      {/* More */}
      {related.length > 0 && (
        <section className="container-page pb-16 pt-11">
          <Seam label="Flere innlegg" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => {
              const rc = CATEGORY_META[r.category];
              return (
                <Link key={r.slug} href={`/journal/${r.slug}`} className="group block">
                  <div className="stitch overflow-hidden bg-brand-coffee">
                    <div className="relative h-[190px] w-full">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 50vw, 30vw"
                      />
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2">
                    <span className={`h-[10px] w-[10px] shrink-0 ${rc.dot}`} />
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${rc.text}`}>
                      {r.category}
                    </span>
                  </div>
                  <h3 className="mt-2 font-heading text-[21px] font-extrabold leading-[1.12] tracking-tight text-brand-coffee transition-colors group-hover:text-brand-terracotta">
                    {r.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom back */}
      <div className="container-page pb-20">
        <BackLink strong />
      </div>
    </article>
  );
}
