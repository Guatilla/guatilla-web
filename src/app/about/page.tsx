import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coffee, Globe, Heart, ShieldCheck, MapPin } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import EditorialImageCard from "@/components/ui/EditorialImageCard";

export const metadata = {
  title: "Vår Historie | Kaffe Guatilla",
  description: "Oppdag historien bak Kaffe Guatilla – fra de colombianske fjellene til kaffekulturen i Stavanger.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-linen flex flex-col font-sans selection:bg-brand-terracotta/20">
      
      <main className="flex-grow">
        
        {/* 1. HERO / OUR STORY (Cinematic Landscape) */}
        <section className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden">
          {/* Background Image with Filters */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/assets/perija-hero.jpg" 
              alt="Serranía del Perijá Landskap" 
              fill 
              priority
              className="object-cover object-[center_35%] saturate-[0.85] contrast-[1.1] brightness-[0.95]"
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
            <div className="max-w-3xl text-white">
              <span className="inline-block px-4 py-1.5 bg-brand-terracotta/20 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
                Vår Historie
              </span>
              <h1 className="text-[56px] md:text-[84px] font-heading font-bold mb-10 leading-[0.95] tracking-tight animate-in fade-in slide-in-from-left-6 duration-1000">
                Fra Perijá til <br/> <span className="text-brand-terracotta italic font-light">Stavanger.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-12 max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
                Vår historie begynner i den majestetiske Serranía del Perijá i Colombia, men den finner sitt sanne hjem i Stavanger og den europeiske kaffekulturen.
              </p>
              <div className="flex items-center gap-6 text-white/70 animate-in fade-in slide-in-from-left-10 duration-1000">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-brand-terracotta" />
                  <span className="text-sm font-medium uppercase tracking-widest">Colombia</span>
                </div>
                <div className="h-px w-12 bg-white/20" />
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-brand-terracotta" />
                  <span className="text-sm font-medium uppercase tracking-widest">Stavanger</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MEANING OF "GUATILLA" */}
        <SectionWrapper bgClass="bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-2">
                 <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">
                  Navnet <br/> <span className="text-brand-terracotta">Guatilla.</span>
                </h2>
                <div className="w-16 h-1 bg-brand-terracotta/30 mt-6" />
              </div>
              <div className="md:col-span-3 space-y-6 text-lg text-brand-coffee/70 font-light leading-relaxed">
                <p>
                  "Guatilla" var et begrep brukt av urfolkssamfunnene i Serranía del Perijá for å referere til de utenfor deres fellesskap – et ord som en gang markerte avstand og ulikhet.
                </p>
                <p className="font-medium text-brand-coffee italic">
                  I dag tolker vi dette navnet på nytt.
                </p>
                <p>
                  For oss betyr Guatilla ikke lenger splittelse, men forbindelse. Det er et møtepunkt mellom kulturer, en bro mellom opprinnelse og destinasjon. Det som før markerte en grense, er nå symbolet på vår felles reise.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* 3. ORIGIN OF THE SYMBOL (Circular Sculpture) */}
        <SectionWrapper bgClass="bg-brand-linen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <EditorialImageCard 
              image="/assets/about-circle.jpg" 
              alt="Guatilla sirkulær skulptur ved utsiktspunktet" 
              variant="large"
              className="order-2 lg:order-1"
            />
            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">
                  Symbolets <br/> <span className="text-brand-terracotta">opprinnelse.</span>
                </h2>
                <div className="w-20 h-1 bg-brand-terracotta/30" />
              </div>
              <div className="space-y-6 text-lg text-brand-coffee/70 font-light leading-relaxed">
                <p>
                  Symbolet til Guatilla ble unnfanget ved et utsiktspunkt høyt oppe i Serranía del Perijá. Det som startet som en visuell opplevelse av landskapet og fargene, har blitt retolket som en bro:
                </p>
                <ul className="space-y-4 pt-4 border-l-2 border-brand-terracotta/20 pl-6">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <span>Mellom territorier</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <span>Mellom kulturer</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <span>Mellom produsenten og din kopp</span>
                  </li>
                </ul>
                <p className="pt-4">
                  Den sirkulære formen representerer en fullstendig syklus – fra den colombianske jorden til Europa. Hver linje og hver nyanse forteller historien om denne uavbrutte forbindelsen.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* 4. INTEGRATION / BRAND SYSTEM */}
        <SectionWrapper bgClass="bg-white border-y border-brand-coffee/5">
          <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
            <div className="flex justify-center">
              <Globe className="text-brand-terracotta animate-spin-slow" size={48} strokeWidth={1} />
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-brand-coffee leading-tight">
              Ett system, <br/> <span className="italic font-light">en felles historie.</span>
            </h2>
            <p className="text-xl md:text-2xl text-brand-coffee/70 font-light leading-relaxed">
              Navnet, symbolet og kaffen er deler av den samme identiteten. Ved å forene meningen bak navnet med kraften i symbolet, skaper vi en opplevelse som er like dyp som den er enkel. En opplevelse som starter i Perijá og fullføres i din hverdag.
            </p>
          </div>
        </SectionWrapper>

        {/* 5. QUALITY AND COMMITMENT */}
        <SectionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">
                  Kvalitet med <span className="text-brand-olive">ansvar.</span>
                </h2>
                <div className="w-20 h-1 bg-brand-olive/30" />
              </div>
              <div className="space-y-6 text-lg text-brand-coffee/70 font-light leading-relaxed">
                <p>
                  For oss er ikke kvalitet bare en teknisk poengsum; det er et løfte. Ved å samarbeide direkte med våre produsenter, sikrer vi rettferdige vilkår og bærekraftig utvikling for lokalsamhumunene i Colombia.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                  <div className="space-y-3">
                    <div className="text-brand-olive flex items-center gap-2">
                      <ShieldCheck size={20} />
                      <span className="font-bold uppercase tracking-wider text-xs">Full åpenhet</span>
                    </div>
                    <p className="text-sm">Ærlighet i hvert eneste ledd av prosessen.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="text-brand-olive flex items-center gap-2">
                      <Heart size={20} />
                      <span className="font-bold uppercase tracking-wider text-xs">Direkte relasjoner</span>
                    </div>
                    <p className="text-sm">Langsiktig tillit bygget på felles vekst.</p>
                  </div>
                </div>
              </div>
            </div>
            <EditorialImageCard 
              image="/assets/about-raw-coffee.jpg" 
              alt="Rå kaffebønner i sekk" 
              variant="default"
            />
          </div>
        </SectionWrapper>

        {/* FINAL CTA */}
        <section className="py-24 md:py-40 px-6 text-center bg-brand-linen">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-brand-coffee leading-tight">
              Bli en del av <br/> <span className="italic font-light text-brand-terracotta">vår historie.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link href="/shop" className="btn-primary px-12 py-5 text-base w-full sm:w-auto text-center">
                Utforsk kaffen
              </Link>
              <Link href="/contacto" className="text-brand-coffee font-bold uppercase tracking-widest text-sm hover:text-brand-terracotta transition-colors flex items-center gap-2 group">
                Kontakt oss <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}
