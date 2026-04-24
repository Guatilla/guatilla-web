import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";
import OriginCard from "@/components/ui/OriginCard";
import TimelineStep from "@/components/ui/TimelineStep";
import ImageTextBlock from "@/components/ui/ImageTextBlock";
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
  title: "Origin | KAFFE GUATILLA",
  description: "Discover the journey of KAFFE GUATILLA specialty coffee from the high-altitude farms of Colombia to your cup in Europe.",
};

export default function OrigenPage() {
  return (
    <div className="flex flex-col w-full bg-brand-linen">
      {/* 1. NAVBAR (Handled in layout.tsx) */}

      {/* 2. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/assets/origin-hero.png" 
          alt="Colombian Coffee Mountains" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for readability */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-shadow-sm">
            From Colombian soil <br className="hidden md:block" /> to Norwegian cups
          </h1>
          <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto opacity-90 leading-relaxed">
            Our coffee begins with Colombian producers, careful processing, and a direct path to Europe — built on fairness, quality, and full traceability.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#process" className="btn-primary w-full sm:w-auto">
              Explore the Process
            </Link>
            <Link href="#producers" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-brand-coffee w-full sm:w-auto">
              Meet the Producers
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ORIGIN STATEMENT */}
      <SectionContainer bgClass="bg-brand-linen py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="text-brand-terracotta font-bold uppercase tracking-[0.3em] text-xs">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">
            Origin is not a place. <br /> It is a relationship.
          </h2>
          <p className="text-xl text-brand-coffee/70 font-light leading-relaxed italic">
            &quot;At KAFFE GUATILLA, origin means knowing who grows the coffee, how it is processed, and how value returns to the people behind each harvest.&quot;
          </p>
          <div className="w-24 h-px bg-brand-terracotta/30 mx-auto pt-4" />
        </div>
      </SectionContainer>

      {/* 4. COLOMBIA REGION SECTION */}
      <SectionContainer id="region" bgClass="bg-brand-cream border-y border-brand-coffee/5">
        <ImageTextBlock 
          title="The Serranía del Perijá"
          description={
            <div className="space-y-4">
              <p>Our coffee is born in the unique microclimates of the Serranía del Perijá, where high altitude and rich volcanic soil create the perfect conditions for specialty coffee.</p>
              <ul className="space-y-3 pt-4">
                {[
                  "High-altitude farms (1,500m+)",
                  "Specialty coffee culture",
                  "Family-based production",
                  "Careful selective harvesting",
                  "Rich soil and diverse microclimates"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-brand-coffee/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
          imageSrc="/assets/origin-hero.png" // Reusing hero for landscape, or use another one if available
          imageAlt="Colombian Coffee Mountains"
          reverse
        />
      </SectionContainer>

      {/* 5. PRODUCERS SECTION */}
      <SectionContainer id="producers" bgClass="bg-brand-linen">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Built with producers, not around them</h2>
          <p className="text-brand-coffee/60 max-w-2xl mx-auto">We are building a model where transparency and fair value are the foundation of every partnership.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <OriginCard 
            title="Direct relationships"
            description="We work close to Colombian producers and local partners to build long-term trust and sustainable growth."
            icon={<Users size={28} />}
          />
          <OriginCard 
            title="Fair value"
            description="Our model is designed to reduce dependency on exploitative intermediaries, ensuring more money stays with the farmers."
            icon={<Handshake size={28} />}
          />
          <OriginCard 
            title="Shared growth"
            description="As the operation grows, the goal is to create better opportunities and infrastructure across the entire supply chain."
            icon={<TrendingUp size={28} />}
          />
        </div>
      </SectionContainer>

      {/* 6. PROCESSING / TRILLADORA SECTION */}
      <SectionContainer id="process" bgClass="bg-white border-y border-brand-coffee/5">
        <ImageTextBlock 
          title="Controlled processing, better quality"
          description={
            <div className="space-y-6">
              <p>The role of the trilladora is central to our quality promise. By managing our own infrastructure, we ensure that every bean is prepared for export under strict supervision.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-brand-coffee flex items-center gap-2">
                    <ShieldCheck size={18} className="text-brand-olive" />
                    Quality Control
                  </h4>
                  <p className="text-sm text-brand-coffee/70">Rigorous testing before shipment ensures consistency.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-brand-coffee flex items-center gap-2">
                    <Globe size={18} className="text-brand-olive" />
                    Traceability
                  </h4>
                  <p className="text-sm text-brand-coffee/70">Full control over the lot segregation and documentation.</p>
                </div>
              </div>
            </div>
          }
          imageSrc="/assets/trilladora.png"
          imageAlt="Coffee Processing Facility"
        />
      </SectionContainer>

      {/* 7. TRACEABILITY TIMELINE */}
      <SectionContainer id="timeline" bgClass="bg-brand-cream">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee mb-6">Every step matters</h2>
            <p className="text-brand-coffee/60 max-w-xl text-lg font-light">From the first cherry picked to the final cup, we track every moment of the journey.</p>
          </div>
          <div className="space-y-0">
            <TimelineStep number={1} title="Farm" description="Careful cultivation in high-altitude Colombian soil." />
            <TimelineStep number={2} title="Harvest" description="Hand-picked selection of only the ripest coffee cherries." />
            <TimelineStep number={3} title="Selection" description="Manual and mechanical sorting to ensure only defect-free beans proceed." />
            <TimelineStep number={4} title="Processing" description="Controlled drying and hulling in our own trilladora." />
            <TimelineStep number={5} title="Export preparation" description="Careful packaging and logistics for the journey to Europe." />
            <TimelineStep number={6} title="Norway import" description="Direct arrival at Guatilla AS facilities in Norway." />
            <TimelineStep number={7} title="Roasting / distribution" description="Expert roasting and local distribution across Europe." />
            <TimelineStep number={8} title="Cup" description="Specialty coffee enjoyed with a clear conscience and full transparency." isLast />
          </div>
        </div>
      </SectionContainer>

      {/* 8. COLOMBIA → NORWAY BRIDGE */}
      <SectionContainer id="bridge" bgClass="bg-brand-coffee text-white overflow-hidden relative">
        {/* Background texture or subtle decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-terracotta/5 -skew-x-12 translate-x-1/2" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
              A direct bridge between <br /> Colombia and Norway
            </h2>
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
              Guatilla AS operates as the commercial and logistical bridge, removing the typical layers of intermediaries that dilute value. We handle everything from farm relations to European distribution.
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
                <span className="font-bold tracking-widest uppercase text-xs">Processing</span>
              </div>
              <div className="flex items-center text-white/30">
                <ChevronRight />
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="font-bold tracking-widest uppercase text-xs">Norway</span>
              </div>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
            <div className="relative w-full h-full border border-white/10 rounded-2xl flex items-center justify-center p-8 bg-brand-linen/5">
                <div className="text-center space-y-4">
                   <Globe size={120} className="text-brand-terracotta/40 mx-auto" strokeWidth={1} />
                   <p className="text-sm font-bold tracking-[0.2em] uppercase text-brand-terracotta">Global Direct Trade</p>
                </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 9. QUALITY AND TRUST SECTION */}
      <SectionContainer id="quality" bgClass="bg-brand-linen">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee">Quality with accountability</h2>
          <p className="text-brand-coffee/60 max-w-2xl mx-auto">Our commitment to quality goes beyond the beans — it extends to how we do business.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <OriginCard 
            title="Transparent sourcing"
            description="We provide detailed data on every harvest, from farm name to payment prices."
            imageSrc="/assets/quality.png"
          />
          <OriginCard 
            title="Controlled logistics"
            description="Direct oversight of the entire shipping process ensures the beans arrive fresh and undamaged."
            imageSrc="/assets/trilladora.png"
          />
          <OriginCard 
            title="Long-term trust"
            description="We invest in relationships with producers, creating stability for their families and our quality."
            imageSrc="/assets/producer.png"
          />
        </div>
      </SectionContainer>

      {/* 10. FINAL CTA */}
      <SectionContainer bgClass="bg-brand-coffee">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-block p-4 bg-brand-terracotta/20 rounded-full mb-4">
            <Coffee size={40} className="text-brand-terracotta" />
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-bold text-white leading-tight">
            Discover coffee with <br /> a real origin
          </h2>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
            Experience the difference of a transparent supply chain and the warmth of Colombian specialty coffee.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link href="/shop" className="btn-primary px-16 py-6 text-lg">
              Shop Coffee
            </Link>
            <Link href="/transparencia" className="text-white font-bold uppercase tracking-widest text-sm hover:text-brand-terracotta transition-colors flex items-center gap-2">
              Learn About Transparency <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </SectionContainer>

      {/* 11. FOOTER (Handled in layout.tsx) */}
    </div>
  );
}
