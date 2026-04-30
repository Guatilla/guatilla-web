import Link from "next/link";
import { Coffee, Ship, Warehouse, CheckCircle, ArrowRight } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import EditorialSplitSection from "@/components/sections/EditorialSplitSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import SectionContainer from "@/components/ui/SectionContainer";

export const metadata = {
  title: "Hjem | Kaffe Guatilla",
  description: "Ekte colombiansk kaffe levert direkte til din dør.",
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-brand-linen">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. BUSINESS MODEL */}
      <SectionContainer id="model" bgClass="bg-brand-cream border-y border-brand-coffee/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-coffee mb-4">Vår direkte modell</h2>
            <p className="text-brand-coffee/60 max-w-2xl mx-auto">Vi kobler colombianske kaffebønder direkte med europeiske kaffeelskere.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-brand-linen rounded-full flex items-center justify-center text-brand-terracotta shadow-sm border border-brand-coffee/5">
                <Coffee size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Colombia</h3>
              <p className="text-brand-coffee/70 font-light">Direkte innkjøp fra bønder i Serranía del Perijá, noe som sikrer rettferdig betaling og full sporbarhet.</p>
            </div>
            <div className="hidden md:flex absolute left-1/3 top-10 -translate-x-1/2 text-brand-olive/30">
              <ArrowRight size={40} />
            </div>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-brand-linen rounded-full flex items-center justify-center text-brand-terracotta shadow-sm border border-brand-coffee/5">
                <Warehouse size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Prosessering</h3>
              <p className="text-brand-coffee/70 font-light">Egen infrastruktur (trilladora) lar oss kontrollere kvaliteten fra bønne til eksport.</p>
            </div>
            <div className="hidden md:flex absolute left-2/3 top-10 -translate-x-1/2 text-brand-olive/30">
              <ArrowRight size={40} />
            </div>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-brand-linen rounded-full flex items-center justify-center text-brand-terracotta shadow-sm border border-brand-coffee/5">
                <Ship size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Norge</h3>
              <p className="text-brand-coffee/70 font-light">Import og distribusjon av Guatilla AS direkte til din dør i Europa.</p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 3. PHILOSOPHY */}
      <SectionContainer id="philosophy" bgClass="bg-brand-linen border-y border-brand-coffee/5">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">
            Rettferdig betaling. Full sporbarhet. <br/> Ingen mellomledd.
          </h2>
          <p className="text-xl text-brand-coffee/70 font-light leading-relaxed">
            Ved å kontrollere vår egen infrastruktur i Colombia og importere direkte til Norge, sikrer vi at bøndene får en rettferdig pris og du får spesialkaffe av høyeste kvalitet. Hver bønne er sporbar tilbake til den spesifikke gården.
          </p>
          <div className="pt-8">
            <Link href="/about" className="btn-primary">Lær mer om vår påvirkning</Link>
          </div>
        </div>
      </SectionContainer>

      {/* 4. PRODUCERS — Editorial Split */}
      <EditorialSplitSection
        image="/assets/story_illustration.png"
        imageAlt="Colombiansk kaffeprodusent"
        title="Håndverket bak innhøstingen"
        description="Kaffen vår kommer fra de hardtarbeidende familiene i Serranía del Perijá. Vi kjøper ikke bare kaffe; vi bygger langsiktige partnerskap. Ved å gi bønder direkte tilgang til det europeiske markedet, bidrar vi til å opprettholde lokalsamfunn og bevare tradisjonelle jordbruksmetoder."
        cta={{ label: "Utforsk opprinnelse", href: "/origen" }}
        bgClass="bg-white"
      />

      {/* 5. INFRASTRUCTURE — Editorial Split (reverse) */}
      <EditorialSplitSection
        image="/assets/infrastructure.png"
        imageAlt="Prosessering av kaffe"
        title="Presisjon i prosessering"
        description="Vår egen trilladora i Colombia er hjertet i vår virksomhet. Denne infrastrukturen lar oss håndtere sortering, avskalling og tørking med kirurgisk presisjon, noe som sikrer at bare de fineste bønnene blir eksportert."
        checklist={[
          "Moderne sorteringsteknologi",
          "Kvalitetskontroll på hvert trinn",
          "Direkte eksportlogistikk fra Colombia",
        ]}
        reverse
        bgClass="bg-brand-cream"
      />

      {/* 6. TRANSPARENCY */}
      <SectionContainer id="transparencia" bgClass="bg-brand-linen">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-brand-coffee mb-4">Full åpenhet</h2>
            <p className="text-brand-coffee/60">Vi mener du fortjener å vite nøyaktig hvor kaffen din kommer fra.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-brand-terracotta"><CheckCircle size={32} /></div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Rettferdig betaling</h3>
              <p className="text-brand-coffee/70 font-light text-sm">Vi betaler den colombianske bonden rettferdig, noe som sikrer en verdig inntekt for våre partnere.</p>
            </div>
            <div className="space-y-4">
              <div className="text-brand-terracotta"><CheckCircle size={32} /></div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Ingen mellomledd</h3>
              <p className="text-brand-coffee/70 font-light text-sm">Ved å fjerne unødvendige mellomledd, beholder vi mer verdi i de lokale kaffesamfunnene.</p>
            </div>
            <div className="space-y-4">
              <div className="text-brand-terracotta"><CheckCircle size={32} /></div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Garantert kvalitet</h3>
              <p className="text-brand-coffee/70 font-light text-sm">Hvert parti blir testet og poengsatt av profesjonelle før det forlater Colombia.</p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 7. FEATURED PRODUCTS */}
      <FeaturedProducts />

      {/* 8. FINAL CTA */}
      <SectionContainer bgClass="bg-brand-coffee">
        <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
            Klar for å smake ekte colombiansk kaffe?
          </h2>
          <div className="pt-4">
            <Link href="/shop" className="bg-brand-terracotta text-white px-12 py-5 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-brand-terracotta/90 transition-all inline-block shadow-xl">
              Handle nå
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
