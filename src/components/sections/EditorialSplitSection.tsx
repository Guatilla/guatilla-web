import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

type ColorVariant = "coffee" | "terracotta" | "terracottaDark" |"olive" | "gold" | "forest" | "cream";

interface EditorialSplitSectionProps {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string | React.ReactNode;
  cta?: { label: string; href: string };
  reverse?: boolean;
  checklist?: string[];
  variant?: ColorVariant;
  imageFit?: "cover" | "contain";
}

const variants = {
  coffee: {
    card: "bg-brand-coffee text-brand-cream",
    accent: "text-brand-terracotta",
    body: "text-brand-cream/75",
    imageBg: "bg-brand-linen bg-paper-texture",
  },
  terracotta: {
    card: "bg-brand-terracotta text-white",
    accent: "text-brand-gold",
    body: "text-white/80",
    imageBg: "bg-brand-linen bg-paper-texture",
  },
  terracottaDark: {
    card: "bg-brand-terracotta-dark text-brand-cream",
    accent: "text-brand-gold",
    body: "text-brand-cream/75",
    imageBg: "bg-brand-linen bg-paper-texture",
  },
  olive: {
    card: "bg-brand-olive text-brand-cream",
    accent: "text-brand-gold",
    body: "text-brand-cream/80",
    imageBg: "bg-brand-linen bg-paper-texture",
  },
  gold: {
    card: "bg-brand-gold text-brand-coffee",
    accent: "text-brand-terracotta-dark",
    body: "text-brand-coffee/70",
    imageBg: "bg-brand-cream bg-paper-texture",
  },
  forest: {
    card: "bg-brand-forest text-brand-cream",
    accent: "text-brand-gold",
    body: "text-brand-cream/75",
    imageBg: "bg-brand-linen bg-paper-texture",
  },
  cream: {
    card: "bg-brand-cream text-brand-coffee",
    accent: "text-brand-terracotta",
    body: "text-brand-coffee/70",
    imageBg: "bg-brand-linen bg-paper-texture",
  },
};

export default function EditorialSplitSection({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  cta,
  reverse = false,
  checklist,
  variant = "coffee",
  imageFit = "cover",
}: EditorialSplitSectionProps) {
  const theme = variants[variant];

  return (
    <section className="w-full bg-brand-linen px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div
          className={`grid min-h-[360px] grid-cols-1 items-center gap-8 overflow-hidden rounded-[28px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.12)] lg:grid-cols-2 lg:p-8 ${theme.card} ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div
            className={`group relative h-[260px] overflow-hidden rounded-xl border border-white/10 ${theme.imageBg} lg:h-[320px]`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className={`
                ${imageFit === "contain" ? "object-contain p-2 scale-[1.08]" : "object-cover"}
                grayscale contrast-[1.12] sepia-[0.18] opacity-90
                transition-all duration-700 ease-out
                group-hover:grayscale-0 group-hover:sepia-0 group-hover:opacity-100
              `}
            />

            {/* tono cálido tipo papel antiguo */}
            <div className="pointer-events-none absolute inset-0 bg-[#d9a441]/10 mix-blend-multiply" />

            {/* viñeta suave */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-70" />

            {/* textura editorial */}
            <div className="pointer-events-none absolute inset-0 bg-paper-texture opacity-30 mix-blend-multiply" />
          </div>

          <div className="px-2 lg:px-8">
            {eyebrow && (
              <p className={`mb-4 text-[10px] font-bold uppercase tracking-[0.32em] ${theme.accent}`}>
                {eyebrow}
              </p>
            )}

            <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
              {title}
            </h2>

            <div className={`mt-5 max-w-xl text-sm leading-relaxed md:text-base ${theme.body}`}>
              {description}
            </div>

            {checklist && (
              <ul className="mt-6 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className={`flex items-start gap-3 text-sm ${theme.body}`}>
                    <Check size={15} className={`mt-0.5 ${theme.accent}`} />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {cta && (
              <Link
                href={cta.href}
                className={`mt-7 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:opacity-70 ${theme.accent}`}
              >
                {cta.label}
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
