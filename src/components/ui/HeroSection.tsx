import React from "react";
import Image from "next/image";
import Link from "next/link";
import PatchworkBackground from "./PatchworkBackground";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-brand-linen overflow-hidden pt-20">
      
      {/* 50/50 Split Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">
          
          {/* LEFT COLUMN: Text Content (Clean, 70% negative space principle) */}
          <div className="flex flex-col justify-center text-left py-12 lg:py-0 space-y-8 animate-fade-in-up order-2 lg:order-1 relative z-20 pr-0 xl:pr-12">
            
            {/* Very subtle editorial badge */}
            <div className="inline-flex items-center space-x-2 border border-brand-coffee/20 rounded-full px-4 py-1.5 w-fit">
              <span className="block w-2 h-2 rounded-full bg-brand-terracotta"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-coffee/80">Est. 1984 ⸺ Finca La Esperanza</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-brand-coffee leading-[1.1] tracking-tighter">
                KAFFE <br />
                <span className="font-light italic text-brand-terracotta">GUATILLA</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-medium text-brand-coffee/90 uppercase tracking-widest">
                Patchwork Heritage
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-brand-coffee/70 font-light max-w-lg leading-relaxed pt-2">
              Un café 100% colombiano tostado artesanalmente. 
              El equilibrio perfecto entre tradición agrícola y el paladar escandinavo más exigente.
            </p>
            
            <div className="pt-6 space-y-4">
              <Link 
                href="#cafe" 
                className="btn-primary inline-flex items-center shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                Comprar Ahora
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              {/* Trust Microcopy - Conversion Booster */}
              <div className="flex items-center space-x-4 text-xs font-medium text-brand-coffee/60 pt-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-brand-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping in NO over 499 kr
                </span>
                <span className="text-brand-coffee/30">|</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-brand-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Roasted weekly in Oslo
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Focus (Cream background, subtle patchwork frame) */}
          <div className="relative h-[600px] w-full flex items-center justify-center order-1 lg:order-2">
            
            {/* The structural cream background for the product to pop against */}
            <div className="absolute inset-4 sm:inset-10 lg:inset-8 xl:inset-12 bg-brand-cream rounded-[40px] shadow-sm flex items-center justify-center overflow-hidden">
              
              {/* Very Subtle Decorative Patchwork Band - Used strictly as an editorial frame/accent (10% rule) */}
              <PatchworkBackground 
                 variant="partial-bg" 
                 intensity="soft" 
                 opacity={0.15} 
                 blur="md"
                 position="top-0 bottom-0 right-0 w-1/3" // Only visible on the right edge
                 className="mix-blend-multiply opacity-30" 
              />
              
              {/* Main Iconic Bag */}
              <div className="relative z-20 w-full h-[120%] -mt-10 sm:-mt-20 scale-110 flex items-center justify-center group">
                 {/* Soft shadow tailored to the bag shape */}
                 <div className="absolute bottom-1/4 w-3/4 h-12 bg-black/5 blur-xl rounded-[100%]"></div>
                 
                 {/* Product Image Focus */}
                 <Image 
                   src="/assets/coffee_bag_1.png" 
                   alt="Kaffe Guatilla Patchwork Heritage Premium Bag" 
                   width={600} 
                   height={800}
                   priority
                   className="w-auto h-full object-contain filter drop-shadow-[0_20px_30px_rgba(60,42,33,0.15)] transform transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]"
                 />
              </div>

              {/* Decorative small element to balance the composition */}
              <div className="absolute bottom-8 left-8 p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm hidden sm:block">
                 <Image 
                    src="/assets/story_illustration.png" 
                    alt="Campesina" 
                    width={64} 
                    height={64}
                    className="w-16 h-16 object-cover rounded-xl"
                 />
              </div>

            </div>
            
            {/* Decorative organic shapes external to the cream box */}
            <div className="absolute -z-10 top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-terracotta/5 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
      
      {/* Bottom Subtle Divisor connecting to the next section */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-coffee/10 to-transparent"></div>
    </section>
  );
}
