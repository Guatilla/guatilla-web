import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeader from "@/components/sections/SectionHeader";
import Button from "@/components/ui/Button";

interface PhilosophyBlockProps {
  title: React.ReactNode;
  description: React.ReactNode;
  cta?: { label: string; href: string };
  theme?: "light" | "cream" | "dark" | "green" | "warm";
}

export default function PhilosophyBlock({
  title,
  description,
  cta,
  theme = "light",
}: PhilosophyBlockProps) {
  return (
    <SectionContainer
      theme={theme}
      contained={false}
      className="relative overflow-hidden bg-gradient-to-b from-brand-linen to-brand-cream"
    >
      {/* anillos sutiles inspirados en el logo */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border-[28px] border-brand-coffee/[0.04]" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-[300px] w-[300px] rounded-full border-[24px] border-brand-terracotta/[0.045]" />

      {/* calor suave */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/[0.05] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Vår filosofi"
            title={title}
            description={description}
          />

          {cta && (
            <div className="mt-10 flex justify-center">
              <Button href={cta.href} variant="primary" size="md" withArrow>
                {cta.label}
              </Button>
            </div>
          )}
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {["Ansvar", "Opprinnelse", "Langsiktig verdi"].map(
            (item) => (
              <div
                key={item}
                className="rounded-full border border-brand-coffee/10 bg-brand-cream/70 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-coffee/80 backdrop-blur-sm"
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
