import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import EditorialBlock from "@/components/ui/EditorialBlock";

export default function FieldJournalSection() {
  return (
    <SectionContainer id="feltjournal" bgClass="bg-brand-linen border-y border-brand-coffee/5">
      <div className="max-w-6xl mx-auto space-y-16 lg:space-y-24">
        
        {/* Full Width Hero Intro */}
        <div className="text-center md:text-left space-y-8 pb-8 lg:pb-16 border-b border-brand-coffee/10">
          <span className="text-brand-terracotta font-bold uppercase tracking-[0.3em] text-xs">
            Direkte fra kilden
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-brand-coffee">
            Feltjournal
          </h2>
          <div className="w-24 h-px bg-brand-terracotta/40 md:mx-0 mx-auto" />
          <div className="space-y-2 border-l-2 border-brand-terracotta/30 pl-6 max-w-2xl">
            <p className="text-xl md:text-2xl text-brand-coffee/90 font-medium leading-relaxed">
              Dette er ikke markedsføring.<br />
              Dette er dokumentasjon fra feltet.
            </p>
            <p className="text-lg text-brand-coffee/60 font-light italic">
              Vi deler det vi ser, slik det er.
            </p>
          </div>
        </div>

        {/* Narrative Flow */}
        <div className="space-y-4">
          
          {/* 1. Menneskene (People) */}
          <EditorialBlock
            title="Menneskene"
            description="Kaffen vår starter hos produsentene. Det krever dyp kunnskap og omsorg for å pleie avlingene i krevende høydedrag. Hver innhøsting er et resultat av dedikert familietradisjon og hardt arbeid."
            imageSrc="/assets/producer.png"
            location="Serranía del Perijá"
            status="Dokumentert"
            date="Mars 2024"
            reverse={false}
          />

          {/* 2. Prosessen (Process) */}
          <EditorialBlock
            title="Prosessen"
            description="Etter innhøstingen følger en presisjonsfase. Tørking og prosessering ved opprinnelsen krever streng kontroll. Dette bildet viser kaffebønnene i sin rå, beskyttende form før de renses for eksport."
            imageSrc="/assets/about-raw-coffee.jpg"
            location="Trilladora, Colombia"
            status="Under vurdering"
            date="Mars 2024"
            reverse={true}
          />

          {/* 3. Territoriet (Territory) */}
          <EditorialBlock
            title="Territoriet"
            description="Kvaliteten ligger i jordsmonnet. Serranía del Perijá byr på unike mikroklima, rent vann fra fjellet og vulkansk jord som gir den karakteristiske smaken til Guatilla-kaffen."
            imageSrc="/assets/perija-hero.jpg"
            location="Serranía del Perijá"
            status="Kartlagt"
            date="Februar 2024"
            reverse={false}
          />

        </div>
      </div>
    </SectionContainer>
  );
}
