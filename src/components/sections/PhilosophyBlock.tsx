import React from "react";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";

interface PhilosophyBlockProps {
  title: string;
  description: string;
  cta?: { label: string; href: string };
  bgClass?: string;
}

export default function PhilosophyBlock({
  title,
  description,
  cta,
  bgClass = "bg-transparent",
}: PhilosophyBlockProps) {
  return (
    <SectionContainer bgClass={bgClass}>
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">
          {title}
        </h2>
        <p className="text-xl text-brand-coffee/70 font-light leading-relaxed">
          {description}
        </p>
        {cta && (
          <div className="pt-8">
            <Link href={cta.href} className="btn-primary">
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
