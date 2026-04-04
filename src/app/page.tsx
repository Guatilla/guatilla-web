import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import ProductCard from "@/components/ui/ProductCard";
import PatchworkBackground from "@/components/ui/PatchworkBackground";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-linen">
      
      {/* 
        ========================================
        HERO SECTION
        ========================================
      */}
      <HeroSection />

      {/* 
        ========================================
        STORYTELLING SECTION (ENCUENTRO CULTURAL)
        ========================================
      */}
      <SectionContainer id="historia" bgClass="bg-brand-cream relative border-t border-brand-coffee/5 shadow-sm">
        <PatchworkBackground 
          variant="corner"
          intensity="faded"
          blur="md"
          opacity={0.15}
          position="bottom-0 right-0 w-64 h-64 mix-blend-multiply opacity-40"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 relative group w-full flex justify-center lg:justify-end">
            <div className="relative rounded-[40px] overflow-hidden shadow-lg border border-brand-coffee/5 transform transition-transform duration-700 hover:scale-[1.02] w-full max-w-lg aspect-[4/5]">
               <Image 
                  src="/assets/story_illustration.png" 
                  alt="Campesina recolectando café - Patchwork Heritage" 
                  fill
                  className="object-cover"
               />
               <div className="absolute inset-0 bg-brand-coffee/10 mix-blend-overlay"></div>
            </div>
            
            {/* Small decorative accent referencing the patchwork */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-linen rounded-full shadow-md flex items-center justify-center border-4 border-brand-cream hidden sm:flex">
              <span className="text-brand-terracotta font-heading font-bold text-3xl">100%</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8 pl-0 lg:pl-10">
            <div className="inline-block px-4 py-1.5 border border-brand-coffee/20 text-brand-coffee rounded-full font-bold uppercase tracking-widest text-xs mb-2">
              Our Heritage
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-coffee leading-tight">
              More than coffee, <br/>
              <span className="text-brand-terracotta italic font-light">a cultural encounter.</span>
            </h2>
            <div className="space-y-6 text-lg text-brand-coffee/80 font-light leading-relaxed">
              <p>
                Historically, the indigenous term <strong className="font-bold text-brand-coffee">"Guatilla"</strong> was used to name non-indigenous people. Today, we resignify it as a symbol of <strong>cultural blending and European encounter</strong>.
              </p>
              <p>
                Cultivated in the rich lands of the <strong className="font-bold text-brand-olive">Serranía del Perijá</strong>, our coffee is 100% Colombian Arabica that pays the highest tribute to the farmers, while satisfying the refined Nordic palate.
              </p>
              
              <div className="pt-6 border-t border-brand-coffee/10 flex items-start gap-4">
                <div className="p-3 bg-brand-linen rounded-full text-brand-terracotta shadow-sm mt-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brand-coffee uppercase tracking-widest text-sm">Total Traceability</h4>
                  <p className="text-sm pt-1 text-brand-coffee/60">Verifiable by farm and lot. Direct trade transparency.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 
        ========================================
        PRODUCTS SECTION
        ========================================
      */}
      <SectionContainer id="cafe" bgClass="bg-brand-linen relative">
        <PatchworkBackground 
          variant="divider"
          intensity="soft"
          opacity={0.1}
          blur="lg"
          position="top-0 left-0 right-0 w-full"
        />

        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <span className="text-brand-terracotta font-bold uppercase tracking-widest text-xs mb-4 block">Our Selection</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-coffee mb-6">Roasted with Purpose</h2>
          <p className="text-brand-coffee/70 text-lg font-light leading-relaxed">
            Discover the flavors born in the mountains. Profiles that respect the bean and elevate the natural tasting notes of our land.
          </p>
        </div>

        {/* 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          
          <ProductCard 
             id="1"
             name="Patchwork Heritage"
             subtitle="Light Roast | Filter"
             price={199}
             imageSrc="/assets/coffee_bag_1.png"
             badge="Best Seller"
          />

          <ProductCard 
             id="2"
             name="Edición Clásica"
             subtitle="Medium Roast | Espresso"
             price={179}
             imageSrc="/assets/coffee_bag_2.png"
          />

          <ProductCard 
             id="3"
             name="Reserva Perijá"
             subtitle="Dark Roast | French Press"
             price={249}
             imageSrc="/assets/coffee_bag_3.png"
             badge="Limited"
          />

        </div>
        
        <div className="mt-20 text-center relative z-10">
           <Link href="/tienda" className="inline-flex items-center text-brand-coffee font-bold tracking-widest uppercase text-sm group">
             <span className="border-b-2 border-brand-coffee group-hover:border-brand-terracotta group-hover:text-brand-terracotta transition-colors pb-1 mr-2">
               View Full Collection
             </span>
             <svg className="w-4 h-4 text-brand-coffee group-hover:text-brand-terracotta transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
           </Link>
        </div>
      </SectionContainer>

      {/* 
        ========================================
        NEWSLETTER / PRE-FOOTER SECTION
        ========================================
      */}
      <SectionContainer bgClass="bg-brand-cream border-y border-brand-coffee/5 relative overflow-hidden">
        <PatchworkBackground 
           variant="partial-bg"
           intensity="faded"
           opacity={0.05}
           position="inset-0"
        />

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-coffee">Join the Encounter</h2>
          <p className="text-lg text-brand-coffee/70 font-light leading-relaxed">
            Subscribe to our newsletter and receive a 10% discount on your first order of Kaffe Guatilla. 
            Exclusive access to limited single-origin lots.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 rounded-full border border-brand-coffee/10 bg-white focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta text-brand-coffee font-medium placeholder-brand-coffee/40 shadow-sm transition-all"
              required
            />
            <button 
              type="submit" 
              className="btn-primary whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </SectionContainer>

    </div>
  );
}
