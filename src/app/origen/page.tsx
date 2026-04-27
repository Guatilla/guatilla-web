import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";
import OriginCard from "@/components/ui/OriginCard";
import EditorialImageCard from "@/components/ui/EditorialImageCard";
import TimelineStep from "@/components/ui/TimelineStep";
import ImageTextBlock from "@/components/ui/ImageTextBlock";
import FieldJournalSection from "@/components/ui/FieldJournalSection";
import { 
  Users, 
  Handshake, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  ChevronRight,
  Coffee,
} from "lucide-react";

export const metadata = {
  title: "Opprinnelse | Kaffe Guatilla",
  description: "Oppdag reisen til Kaffe Guatilla spesialkaffe fra de høytliggende gårdene i Colombia til din kopp i Europa.",
};

export default function OrigenPage() {
  return (
    <div className="flex flex-col w-full bg-brand-linen">
      {/* 2. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/assets/origin-hero.png" 
          alt="Colombianske kaffefjell" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-shadow-sm">
            Fra colombiansk jord <br className="hidden md:block" /> til norske kopper
          </h1>
          <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto opacity-90 leading-relaxed">
            Kaffen vår starter med colombianske produsenter, nøyaktig prosessering og en direkte vei til Europa — bygget på rettferdighet, kvalitet og full sporbarhet.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#process" className="btn-primary w-full sm:w-auto">
              Utforsk prosessen
            </Link>
            <Link href="#producers" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-brand-coffee w-full sm:w-auto">
              Møt produsentene
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ORIGIN STATEMENT */}
      <SectionContainer bgClass="bg-brand-linen py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="text-brand-terracotta font-bold uppercase tracking-[0.3em] text-xs">Vår filosofi</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">
            Opprinnelse er ikke et sted. <br /> Det er en relasjon.
          </h2>
          <p className="text-xl text-brand-coffee/70 font-light leading-relaxed italic">
            &quot;Hos KAFFE GUATILLA betyr opprinnelse å vite hvem som dyrker kaffen, hvordan den prosesseres, og hvordan verdien går tilbake til menneskene bak hver innhøsting.&quot;
          </p>
          <div className="w-24 h-px bg-brand-terracotta/30 mx-auto pt-4" />
        </div>
      </SectionContainer>

      {/* 4. COLOMBIA REGION SECTION */}
      <SectionContainer id="region" bgClass="bg-brand-cream border-y border-brand-coffee/5">
        <ImageTextBlock 
          title="Serranía del Perijá"
          description={
            <div className="space-y-4">
              <p>Kaffen vår blir født i de unike mikroklimaene i Serranía del Perijá, der høy høyde og rik vulkansk jord skaper de perfekte forholdene for spesialkaffe.</p>
              <ul className="space-y-3 pt-4">
                {[
                  "Gårder i stor høyde (1500m+)",
                  "Spesialkaffekultur",
                  "Familiebasert produksjon",
                  "Nøye selektiv innhøsting",
                  "Rik jord og varierte mikroklima"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-brand-coffee/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
          imageSrc="/assets/origin-hero.png"
          imageAlt="Colombianske kaffefjell"
          reverse
        />
      </SectionContainer>

      {/* 5. PRODUCERS SECTION */}
      <SectionContainer id="producers" bgClass="bg-brand-linen">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Bygget med produsenter, ikke rundt dem</h2>
          <p className="text-brand-coffee/60 max-w-2xl mx-auto">Vi bygger en modell der åpenhet og rettferdig verdi er fundamentet i hvert partnerskap.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <OriginCard 
            title="Direkte relasjoner"
            description="Vi jobber tett med colombianske produsenter og lokale partnere for å bygge langsiktig tillit og bærekraftig vekst."
            icon={<Users size={28} />}
          />
          <OriginCard 
            title="Rettferdig verdi"
            description="Vår modell er utformet for å redusere avhengigheten av utnyttende mellomledd, slik at mer penger forblir hos bøndene."
            icon={<Handshake size={28} />}
          />
          <OriginCard 
            title="Felles vekst"
            description="Etter hvert som driften vokser, er målet å skape bedre muligheter og infrastruktur i hele forsyningskjeden."
            icon={<TrendingUp size={28} />}
          />
        </div>
      </SectionContainer>

      {/* 6. PROCESSING / TRILLADORA SECTION */}
      <SectionContainer id="process" bgClass="bg-white border-y border-brand-coffee/5">
        <ImageTextBlock 
          title="Kontrollert prosessering, bedre kvalitet"
          description={
            <div className="space-y-6">
              <p>Trilladoraens rolle er sentral i vårt kvalitetsløfte. Ved å håndtere vår egen infrastruktur, sikrer vi at hver bønne er klargjort for eksport under streng overvåking.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-brand-coffee flex items-center gap-2">
                    <ShieldCheck size={18} className="text-brand-olive" />
                    Kvalitetskontroll
                  </h4>
                  <p className="text-sm text-brand-coffee/70">Grundig testing før forsendelse sikrer konsistens.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-brand-coffee flex items-center gap-2">
                    <Globe size={18} className="text-brand-olive" />
                    Sporbarhet
                  </h4>
                  <p className="text-sm text-brand-coffee/70">Full kontroll over dokumentasjon og partier.</p>
                </div>
              </div>
            </div>
          }
          imageSrc="/assets/trilladora.png"
          imageAlt="Anlegg for kaffeprosessering"
        />
      </SectionContainer>

      {/* 7. TRACEABILITY TIMELINE */}
      <SectionContainer id="timeline" bgClass="bg-brand-cream">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee mb-6">Hvert trinn teller</h2>
            <p className="text-brand-coffee/60 max-w-xl text-lg font-light">Fra det første bæret som plukkes til den siste koppen, følger vi hvert øyeblikk på reisen.</p>
          </div>
          <div className="space-y-0">
            <TimelineStep number={1} title="Gård" description="Nøye dyrking i høytliggende colombiansk jord." />
            <TimelineStep number={2} title="Innhøsting" description="Håndplukket utvalg av bare de modneste kaffebærene." />
            <TimelineStep number={3} title="Seleksjon" description="Manuell og mekanisk sortering for å sikre feilfrie bønner." />
            <TimelineStep number={4} title="Prosessering" description="Kontrollert tørking og avskalling i vår egen trilladora." />
            <TimelineStep number={5} title="Eksportforberedelse" description="Nøye pakking og logistikk for reisen til Europa." />
            <TimelineStep number={6} title="Import til Norge" description="Direkte ankomst til Guatilla AS sine anlegg i Norge." />
            <TimelineStep number={7} title="Brenning / Distribusjon" description="Ekspertbrenning og lokal distribusjon i hele Europa." />
            <TimelineStep number={8} title="Kopp" description="Spesialkaffe nytes med god samvittighet og full åpenhet." isLast />
          </div>
        </div>
      </SectionContainer>

      {/* 8. COLOMBIA → NORWAY BRIDGE */}
      <SectionContainer id="bridge" bgClass="bg-brand-coffee text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-terracotta/5 -skew-x-12 translate-x-1/2" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
              En direkte bro mellom <br /> Colombia og Norge
            </h2>
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
              Guatilla AS fungerer som den kommersielle og logistiske broen, og fjerner de typiske lagene med mellomledd. Vi håndterer alt fra gårdsrelasjoner til europeisk distribusjon.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-terracotta" />
                <span className="font-bold tracking-widest uppercase text-xs">Colombia</span>
              </div>
              <div className="flex items-center text-white/30">
                <ChevronRight />
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-olive" />
                <span className="font-bold tracking-widest uppercase text-xs">Prosessering</span>
              </div>
              <div className="flex items-center text-white/30">
                <ChevronRight />
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="font-bold tracking-widest uppercase text-xs">Norge</span>
              </div>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
            <div className="relative w-full h-full border border-white/10 rounded-2xl flex items-center justify-center p-8 bg-brand-linen/5">
                <div className="text-center space-y-4">
                   <Globe size={120} className="text-brand-terracotta/40 mx-auto" strokeWidth={1} />
                   <p className="text-sm font-bold tracking-[0.2em] uppercase text-brand-terracotta">Global direkte handel</p>
                </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 9. QUALITY AND TRUST SECTION */}
      <SectionContainer id="quality" bgClass="bg-brand-linen">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Kvalitet med ansvar</h2>
          <p className="text-brand-coffee/60 max-w-2xl mx-auto">Vårt engasjement for kvalitet strekker seg utover bønnene — det gjelder også hvordan vi driver forretninger.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <EditorialImageCard 
            title="Gjennomsiktig innkjøp"
            description="Vi gir detaljert informasjon om hver innhøsting, fra gårdsnavn til betalingspriser."
            image="/assets/quality.png"
            alt="Gjennomsiktig innkjøp"
          />
          <EditorialImageCard 
            title="Kontrollert logistikk"
            description="Direkte tilsyn med hele fraktprosessen sikrer at bønnene ankommer ferske og uskadet."
            image="/assets/trilladora.png"
            alt="Kontrollert logistikk"
          />
          <EditorialImageCard 
            title="Langsiktig tillit"
            description="Vi investerer i relasjoner med produsenter, noe som skaper stabilitet for deres familier og vår kvalitet."
            image="/assets/producer.png"
            alt="Langsiktig tillit"
          />
        </div>
      </SectionContainer>

      {/* FIELD JOURNAL SECTION */}
      <FieldJournalSection />

      {/* 10. FINAL CTA */}
      <SectionContainer bgClass="bg-brand-coffee">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-block p-4 bg-brand-terracotta/20 rounded-full mb-4">
            <Coffee size={40} className="text-brand-terracotta" />
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-bold text-white leading-tight">
            Oppdag kaffe med <br /> en ekte opprinnelse
          </h2>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
            Opplev forskjellen med en gjennomsiktig forsyningskjede og varmen fra colombiansk spesialkaffe.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link href="/shop" className="btn-primary px-16 py-6 text-lg">
              Handle kaffe
            </Link>
            <Link href="/about" className="text-white font-bold uppercase tracking-widest text-sm hover:text-brand-terracotta transition-colors flex items-center gap-2">
              Lær om sporbarhet <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
