import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/ui/HeroSection";
import ProductCard from "@/components/ui/ProductCard";
import SectionContainer from "@/components/ui/SectionContainer";
import { Coffee, Ship, Warehouse, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-brand-linen">
      {/* 1. NAVBAR is handled in layout.tsx */}

      {/* 2. HERO SECTION */}
      <HeroSection />

      {/* 3. BUSINESS MODEL (Colombia → Norway) */}
      <SectionContainer id="model" bgClass="bg-brand-cream border-y border-brand-coffee/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-coffee mb-4">Our Direct Model</h2>
            <p className="text-brand-coffee/60 max-w-2xl mx-auto">Connecting Colombian farmers directly with European coffee lovers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative">
            {/* Column 1: Colombia */}
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-brand-linen rounded-full flex items-center justify-center text-brand-terracotta shadow-sm border border-brand-coffee/5">
                <Coffee size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Colombia</h3>
              <p className="text-brand-coffee/70 font-light">Direct sourcing from farmers in the Serranía del Perijá, ensuring fair pay and full traceability.</p>
            </div>

            {/* Arrow/Flow Icon (Desktop Only) */}
            <div className="hidden md:flex absolute left-1/3 top-10 -translate-x-1/2 text-brand-olive/30">
              <ArrowRight size={40} />
            </div>

            {/* Column 2: Processing */}
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-brand-linen rounded-full flex items-center justify-center text-brand-terracotta shadow-sm border border-brand-coffee/5">
                <Warehouse size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Processing</h3>
              <p className="text-brand-coffee/70 font-light">Own infrastructure (trilladora) allows us to control quality from bean to export.</p>
            </div>

            {/* Arrow/Flow Icon (Desktop Only) */}
            <div className="hidden md:flex absolute left-2/3 top-10 -translate-x-1/2 text-brand-olive/30">
              <ArrowRight size={40} />
            </div>

            {/* Column 3: Norway */}
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-brand-linen rounded-full flex items-center justify-center text-brand-terracotta shadow-sm border border-brand-coffee/5">
                <Ship size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Norway</h3>
              <p className="text-brand-coffee/70 font-light">Import & distribution by Guatilla AS directly to your door in Europe.</p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 4. FEATURED PRODUCTS */}
      <SectionContainer id="shop" bgClass="bg-brand-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-brand-coffee mb-4">Our Coffee Selection</h2>
            <Link href="/shop" className="text-brand-terracotta font-bold uppercase tracking-widest text-xs hover:underline">View All Coffee</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard 
              id="1"
              name="Patchwork Heritage"
              subtitle="Chocolate, Nuts, Red Fruits"
              price={199}
              imageSrc="/assets/coffee_bag_1.png"
              badge="Best Seller"
            />
            <ProductCard 
              id="2"
              name="Serranía Reserva"
              subtitle="Caramel, Citrus, Floral"
              price={219}
              imageSrc="/assets/coffee_bag_2.png"
              badge="Limited"
            />
            <ProductCard 
              id="3"
              name="Finca La Esperanza"
              subtitle="Honey, Berries, Vanilla"
              price={189}
              imageSrc="/assets/coffee_bag_3.png"
            />
          </div>
        </div>
      </SectionContainer>

      {/* 5. PHILOSOPHY (Fair Trade) */}
      <SectionContainer id="philosophy" bgClass="bg-brand-linen border-y border-brand-coffee/5">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee leading-tight">
            Fair pay. Full traceability. <br/> No intermediaries.
          </h2>
          <p className="text-xl text-brand-coffee/70 font-light leading-relaxed">
            By controlling our own infrastructure in Colombia and importing directly to Norway, we ensure that farmers receive a fair price and you receive the highest quality specialty coffee. Every bean is traceable back to the specific farm and lot.
          </p>
          <div className="pt-8">
            <Link href="/transparencia" className="btn-primary">Learn More About Our Impact</Link>
          </div>
        </div>
      </SectionContainer>

      {/* 6. PRODUCERS / ORIGIN STORY */}
      <SectionContainer id="about" bgClass="bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-auto">
            <Image 
              src="/assets/story_illustration.png" 
              alt="Colombian Coffee Producer" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="p-12 lg:p-24 flex flex-col justify-center space-y-8">
            <h2 className="text-4xl font-heading font-bold text-brand-coffee">The Hands Behind the Harvest</h2>
            <p className="text-lg text-brand-coffee/70 font-light leading-relaxed">
              Our coffee comes from the hard-working families of the Serranía del Perijá. We don&apos;t just buy coffee; we build long-term partnerships. By providing farmers with direct access to the European market, we help sustain communities and preserve traditional farming methods.
            </p>
            <div className="pt-4">
              <Link href="/origen" className="inline-flex items-center space-x-2 text-brand-terracotta font-bold uppercase tracking-widest text-sm group">
                <span>Explore Origins</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 7. INFRASTRUCTURE (AUTHORITY) */}
      <SectionContainer id="infrastructure" bgClass="bg-brand-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 lg:p-24 flex flex-col justify-center space-y-8 order-2 lg:order-1">
            <h2 className="text-4xl font-heading font-bold text-brand-coffee">Precision in Processing</h2>
            <p className="text-lg text-brand-coffee/70 font-light leading-relaxed">
              Our own trilladora in Colombia is the heart of our operations. This infrastructure allows us to manage the sorting, hulling, and drying process with surgical precision, ensuring that only the finest beans make it into our exports.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-brand-coffee/80">
                <CheckCircle size={20} className="text-brand-olive" />
                <span>State-of-the-art sorting technology</span>
              </li>
              <li className="flex items-center space-x-3 text-brand-coffee/80">
                <CheckCircle size={20} className="text-brand-olive" />
                <span>Quality control at every stage</span>
              </li>
              <li className="flex items-center space-x-3 text-brand-coffee/80">
                <CheckCircle size={20} className="text-brand-olive" />
                <span>Direct export logistics from Colombia</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] lg:h-auto order-1 lg:order-2">
            <Image 
              src="/assets/infrastructure.png" 
              alt="Processing Infrastructure" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </SectionContainer>

      {/* 8. TRANSPARENCY SECTION */}
      <SectionContainer id="transparencia" bgClass="bg-brand-linen">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-brand-coffee mb-4">Radical Transparency</h2>
            <p className="text-brand-coffee/60">We believe you deserve to know exactly where your coffee comes from.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-brand-terracotta"><CheckCircle size={32} /></div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Farmer Pay</h3>
              <p className="text-brand-coffee/70 font-light text-sm">We pay significantly above C-market prices, ensuring a living wage for our partner farmers.</p>
            </div>
            <div className="space-y-4">
              <div className="text-brand-terracotta"><CheckCircle size={32} /></div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">No Middlemen</h3>
              <p className="text-brand-coffee/70 font-light text-sm">By removing unnecessary intermediaries, we keep more value within the local coffee-growing communities.</p>
            </div>
            <div className="space-y-4">
              <div className="text-brand-terracotta"><CheckCircle size={32} /></div>
              <h3 className="text-xl font-heading font-bold text-brand-coffee">Quality Ensured</h3>
              <p className="text-brand-coffee/70 font-light text-sm">Every lot is cupped and scored by professional tasters before it leaves Colombia.</p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 9. FINAL CTA */}
      <SectionContainer bgClass="bg-brand-coffee">
        <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
            Ready to taste real Colombian coffee?
          </h2>
          <div className="pt-4">
            <Link href="/shop" className="bg-brand-terracotta text-white px-12 py-5 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-brand-terracotta/90 transition-all inline-block shadow-xl">
              Shop Now
            </Link>
          </div>
        </div>
      </SectionContainer>

      {/* 10. FOOTER is handled in layout.tsx */}
    </div>
  );
}
