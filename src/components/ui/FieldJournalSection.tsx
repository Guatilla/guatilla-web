import React from "react";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";
import EditorialImageCard from "@/components/ui/EditorialImageCard";
import { MapPin, Info, Calendar, ArrowRight } from "lucide-react";

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
        <div className="space-y-16">
          
          {/* 1. Menneskene (People) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <EditorialImageCard
              image="/assets/producer.png"
              alt="Menneskene bak kaffen"
              variant="large"
              grayscale
            />
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">Menneskene</h3>
                <p className="text-lg text-brand-coffee/75 font-light leading-relaxed">
                  Kaffen vår starter hos produsentene. Det krever dyp kunnskap og omsorg for å pleie avlingene i krevende høydedrag. Hver innhøsting er et resultat av dedikert familietradisjon og hardt arbeid.
                </p>
              </div>
              <div className="pt-8 border-t border-brand-coffee/10 grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <MapPin size={12} className="text-brand-terracotta" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Sted</span>
                  </div>
                  <p className="text-xs font-medium">Serranía del Perijá</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <Info size={12} className="text-brand-olive" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
                  </div>
                  <p className="text-xs font-medium">Dokumentert</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Dato</span>
                  </div>
                  <p className="text-xs font-medium">Mars 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Prosessen (Process) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 lg:order-1 order-2">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">Prosessen</h3>
                <p className="text-lg text-brand-coffee/75 font-light leading-relaxed">
                  Etter innhøstingen følger en presisjonsfase. Tørking og prosessering ved opprinnelsen krever streng kontroll. Dette bildet viser kaffebønnene i sin rå, beskyttende form før de renses for eksport.
                </p>
              </div>
              <div className="pt-8 border-t border-brand-coffee/10 grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <MapPin size={12} className="text-brand-terracotta" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Sted</span>
                  </div>
                  <p className="text-xs font-medium">Trilladora, Colombia</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <Info size={12} className="text-brand-olive" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
                  </div>
                  <p className="text-xs font-medium">Under vurdering</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Dato</span>
                  </div>
                  <p className="text-xs font-medium">Mars 2024</p>
                </div>
              </div>
            </div>
            <EditorialImageCard
              image="/assets/about-raw-coffee.jpg"
              alt="Kaffeprosessering"
              variant="large"
              grayscale
              className="lg:order-2 order-1"
            />
          </div>

          {/* 3. Territoriet (Territory) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <EditorialImageCard
              image="/assets/perija-hero.jpg"
              alt="Serranía del Perijá"
              variant="large"
              grayscale
            />
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">Territoriet</h3>
                <p className="text-lg text-brand-coffee/75 font-light leading-relaxed">
                  Kvaliteten ligger i jordsmonnet. Serranía del Perijá byr på unike mikroklima, rent vann fra fjellet og vulkansk jord som gir den karakteristiske smaken til Guatilla-kaffen.
                </p>
              </div>
              <div className="pt-8 border-t border-brand-coffee/10 grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <MapPin size={12} className="text-brand-terracotta" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Sted</span>
                  </div>
                  <p className="text-xs font-medium">Serranía del Perijá</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <Info size={12} className="text-brand-olive" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
                  </div>
                  <p className="text-xs font-medium">Kartlagt</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-coffee/50">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Dato</span>
                  </div>
                  <p className="text-xs font-medium">Februar 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FINAL CTA */}
        <div className="pt-24 lg:pt-32 text-center border-t border-brand-coffee/[0.08]">
          <Link 
            href="/journal" 
            className="group inline-flex items-center gap-4 text-brand-coffee hover:text-brand-terracotta transition-all duration-300"
          >
            <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Se hele feltjournalen
            </span>
            <ArrowRight size={40} className="transition-transform group-hover:translate-x-3 text-brand-terracotta/40 group-hover:text-brand-terracotta" strokeWidth={1} />
          </Link>
        </div>

      </div>
    </SectionContainer>
  );
}
