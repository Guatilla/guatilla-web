import React from "react";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  bgClass?: string;
}

export default function CTASection({
  title,
  subtitle,
  cta,
  bgClass = "bg-brand-coffee",
}: CTASectionProps) {
  const isDark = bgClass.includes("brand-coffee");

  return (
    <SectionContainer bgClass={bgClass}>
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-10">
        <h2
          className={`text-4xl md:text-6xl font-heading font-bold leading-tight ${
            isDark ? "text-white" : "text-brand-coffee"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-xl font-light leading-relaxed ${
              isDark ? "text-white/80" : "text-brand-coffee/70"
            }`}
          >
            {subtitle}
          </p>
        )}
        {cta && (
          <div className="pt-4">
            <Link
              href={cta.href}
              className={`inline-block px-12 py-5 rounded-full font-bold tracking-widest uppercase text-sm transition-all shadow-xl ${
                isDark
                  ? "bg-brand-terracotta text-white hover:bg-brand-terracotta/90"
                  : "bg-brand-coffee text-white hover:bg-brand-coffee/90"
              }`}
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
