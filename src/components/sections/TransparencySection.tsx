import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeader from "@/components/sections/SectionHeader";
import { CheckCircle } from "lucide-react";

const items = [
  {
    title: "Rettferdig betaling",
    description:
      "Vi betaler den colombianske bonden rettferdig, noe som sikrer en verdig inntekt for våre partnere.",
  },
  {
    title: "Ingen mellomledd",
    description:
      "Ved å fjerne unødvendige mellomledd, beholder vi mer verdi i de lokale kaffesamfunnene.",
  },
  {
    title: "Garantert kvalitet",
    description:
      "Hvert parti blir testet og evaluert før eksport for å sikre høyeste standard.",
  },
];

export default function TransparencySection() {
  return (
    <SectionContainer theme="light">
      <div className="max-w-5xl mx-auto">
        
        <SectionHeader
          eyebrow="Sporbarhet"
          title="Full åpenhet"
          description="Vi mener du fortjener å vite nøyaktig hvor kaffen din kommer fra."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item) => (
            <div key={item.title} className="space-y-4">
              <CheckCircle
                size={28}
                className="text-brand-terracotta"
              />

              <h3 className="font-heading text-xl font-bold text-brand-coffee">
                {item.title}
              </h3>

              <p className="text-sm text-brand-coffee/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SectionContainer>
  );
}